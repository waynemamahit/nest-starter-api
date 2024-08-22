import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/providers//prisma.service';

@Injectable()
export class AbilityService {
  constructor(private prisma: PrismaService) {}
}
