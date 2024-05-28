import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LocalOwnerAuthGuard } from './guards/local-owner-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller()
export class AuthController {
  @Post('ower-login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalOwnerAuthGuard)
  owerLogin() {
    return 'Hello';
  }
}
