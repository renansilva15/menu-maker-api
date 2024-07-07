import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtOwnerAuthGuard extends AuthGuard('jwt-owner') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
}
