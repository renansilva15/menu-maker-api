import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class CPFTransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>();

    if (request.body && request.body.cpf) {
      request.body.cpf = getNumericCharacters(request.body.cpf);
    }

    return next.handle();
  }
}

function getNumericCharacters(str: string): string {
  return str.match(/\d/g)?.join('') ?? '';
}
