import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { BotsController } from './bots.controller';
import { BotsService } from './bots.service';

@Module({
  imports: [PrismaModule],
  controllers: [BotsController],
  providers: [BotsService],
  exports: [BotsService],
})
export class BotsModule { } 