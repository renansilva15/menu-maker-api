import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { PersonEntity } from './entities/person.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import { HashService } from 'src/common/modules/hash/hash.service';
import { TokensService } from '../tokens/tokens.service';
import { MailService } from '../mail/mail.service';
import { TokenPurpose } from '../tokens/entities/token.entity';
import { CreateEmailDto } from '../mail/dto/create-email.dto';

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(PersonEntity)
    private readonly personRepository: Repository<PersonEntity>,
    private readonly hashService: HashService,
    private readonly tokenService: TokensService,
    @Inject('VERIFY_EMAIL_ROUTE')
    private readonly verifyEmailRoute: string,
    private readonly mailService: MailService,
  ) {}

  private generateVerifyEmailMessage(
    firstName: string,
    verifyEmailLink: string,
  ): string {
    return `Olá ${firstName}, clique no link abaixo para verificar seu email:\n${verifyEmailLink}`;
  }

  private async generateToken(
    id: string,
    purpose: TokenPurpose,
    expiresAt?: Date,
  ): Promise<string> {
    const token = await this.tokenService.create({
      id,
      purpose,
      expiresAt,
    });

    return token.id;
  }

  private async sendEmail(createEmailDto: CreateEmailDto): Promise<any> {
    return this.mailService.create(createEmailDto);
  }

  async create(createPersonDto: CreatePersonDto): Promise<PersonEntity> {
    const person = await this.personRepository.findOne({
      where: [{ cpf: createPersonDto.cpf }, { email: createPersonDto.email }],
    });

    if (person) {
      let errorMessage = '';

      if (createPersonDto.cpf === person.cpf) {
        errorMessage += `Person with CPF ${createPersonDto.cpf} already exists`;
      }

      if (createPersonDto.email === person.email) {
        errorMessage += errorMessage.length > 0 ? '. ' : '';
        errorMessage += `Person with email ${createPersonDto.email} already exists`;
      }

      throw new ConflictException(errorMessage);
    }

    const hashedPassword = await this.hashService.hash(
      createPersonDto.password,
    );

    const isEmailVerified = false;
    const isFirstLogin = true;
    const isBanned = false;

    const newPerson = await this.personRepository.save(
      this.personRepository.create({
        ...createPersonDto,
        password: hashedPassword,
        isEmailVerified,
        isFirstLogin,
        isBanned,
      }),
    );

    const token = await this.generateToken(
      newPerson.id,
      TokenPurpose.VERIFY_EMAIL,
    );

    const verifyEmailLink = `${this.verifyEmailRoute}?id=${newPerson.id}&token=${token}`;

    const verifyEmailMessage = this.generateVerifyEmailMessage(
      newPerson.firstName,
      verifyEmailLink,
    );

    await this.sendEmail({
      to: newPerson.email,
      subject: 'Verifique seu email',
      text: verifyEmailMessage,
      sender: 'Menu Maker',
    });

    return newPerson;
  }

  async verifyEmail(id: string, token: string): Promise<PersonEntity> {
    const person = await this.personRepository.findOne({
      where: {
        id,
        tokens: {
          id: token,
        },
      },
    });

    if (!person) {
      throw new NotFoundException(
        `Person with ID ${id} and token ${token} not found`,
      );
    }

    return this.personRepository.save({ ...person, isEmailVerified: true });
  }

  async findAll(): Promise<PersonEntity[]> {
    return this.personRepository.find();
  }

  async findOne(id: string): Promise<PersonEntity> {
    const person = await this.personRepository.findOne({ where: { id } });

    if (!person) {
      throw new NotFoundException(`Person with ID ${id} not found`);
    }

    return person;
  }

  async findOneByEmail(email: string): Promise<PersonEntity> {
    const person = await this.personRepository.findOne({
      where: { email },
      relations: ['owner'],
    });

    if (!person) {
      throw new NotFoundException(`Person with email ${email} not found`);
    }

    return person;
  }
}
