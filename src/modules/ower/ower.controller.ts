import { Controller } from '@nestjs/common';
import { OwerService } from './ower.service';

@Controller('ower')
export class OwerController {
  constructor(private readonly owerService: OwerService) {}
}
