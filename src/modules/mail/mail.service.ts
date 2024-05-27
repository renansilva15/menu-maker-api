import { Inject, Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import axios from 'axios';

@Injectable()
export class MailService {
  constructor(
    @Inject('MAIL_SERVICE_URL')
    private readonly mailServiceURL: string,
  ) {}

  async create(createEmailDto: CreateEmailDto): Promise<any> {
    return axios.post(this.mailServiceURL, createEmailDto);
  }
}
