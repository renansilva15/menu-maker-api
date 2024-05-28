import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LocalOwnerAuthGuard } from './guards/local-owner-auth.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';
import { PersonEntity } from '../persons/entities/person.entity';
import { AuthService } from './auth.service';
import { OwnerLoginDto } from './dto/owner-login.dto';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('ower-login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalOwnerAuthGuard)
  @ApiBody({ type: OwnerLoginDto })
  owerLogin(@Request() req: ExpressRequest & { user: PersonEntity }) {
    return this.authService.ownerLogin(req.user);
  }
}
