import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BotCreateDto } from './dto/bot-create.dto';
import { BotResponseDto } from './dto/bot-response.dto';
import { BotStatisticResponseDto } from './dto/bot-statistic-response.dto';
import { BotUpdateDto } from './dto/bot-update.dto';

@Injectable()
export class BotsService {
  constructor(private prisma: PrismaService) { }

  async createBot(userId: string, createBotDto: BotCreateDto): Promise<BotResponseDto> {
    const bot = await this.prisma.bot.create({
      data: {
        ...createBotDto,
        userId,
        isPublic: false,
        status: 'PAUSE',
      },
    });

    await this.prisma.botStatistic.create({
      data: {
        botId: bot.id,
        cycles_completed: 0,
        deposit_usdt: createBotDto.deposit,
        profit_usdt: 0,
        profit_percentage: 0,
      },
    });

    return this.mapToResponseDto(bot);
  }

  async getAllBots(userId: string): Promise<BotResponseDto[]> {
    const bots = await this.prisma.bot.findMany({
      where: {
        OR: [
          { isPublic: true },
          { userId: userId },
        ]
      },
      orderBy: [
        { isPublic: 'desc' },
        { createdAt: 'desc' },
      ],
    });

    return bots.map(bot => this.mapToResponseDto(bot));
  }



  async updateBot(userId: string, updateBotDto: BotUpdateDto): Promise<BotResponseDto> {
    const existingBot = await this.prisma.bot.findFirst({
      where: {
        id: updateBotDto.id,
        userId: userId,
        isPublic: false,
      },
    });

    if (!existingBot) {
      throw new NotFoundException('Bot not found or not available for editing');
    }

    const { id, ...updateData } = updateBotDto;

    const updatedBot = await this.prisma.bot.update({
      where: { id },
      data: updateData,
    });

    return this.mapToResponseDto(updatedBot);
  }

  async deleteBot(userId: string, botId: string): Promise<void> {
    const bot = await this.prisma.bot.findFirst({
      where: {
        id: botId,
        userId: userId,
        isPublic: false,
      },
    });

    if (!bot) {
      throw new NotFoundException('Bot not found or not available for deletion');
    }

    await this.prisma.bot.delete({
      where: { id: botId },
    });
  }

  async getBotStatistics(userId: string): Promise<BotStatisticResponseDto[]> {
    const bots = await this.prisma.bot.findMany({
      where: {
        OR: [
          { isPublic: true },
          { userId: userId, isPublic: false },
        ]
      },
      include: {
        statistics: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
      orderBy: [
        { isPublic: 'desc' },
        { createdAt: 'desc' },
      ],
    });

    return bots.map(bot => {
      const latestStat = bot.statistics[0];
      return {
        id: bot.id,
        name: bot.name,
        symbol: bot.symbol,
        cycles_completed: latestStat?.cycles_completed || 0,
        deposit_usdt: latestStat?.deposit_usdt || bot.deposit,
        profit_usdt: latestStat?.profit_usdt || 0,
        profit_percentage: latestStat?.profit_percentage || 0,
      };
    });
  }


  async createPublicBot(createBotDto: BotCreateDto): Promise<BotResponseDto> {
    const bot = await this.prisma.bot.create({
      data: {
        ...createBotDto,
        userId: null,
        isPublic: true,
        status: 'ACTIVE',
      },
    });

    await this.prisma.botStatistic.create({
      data: {
        botId: bot.id,
        cycles_completed: Math.floor(Math.random() * 20) + 5,
        deposit_usdt: createBotDto.deposit,
        profit_usdt: createBotDto.deposit * (createBotDto.profit_percentage / 100) * Math.floor(Math.random() * 10 + 1),
        profit_percentage: createBotDto.profit_percentage * Math.floor(Math.random() * 5 + 1),
      },
    });

    return this.mapToResponseDto(bot);
  }

  private mapToResponseDto(bot: any): BotResponseDto {
    return {
      id: bot.id,
      name: bot.name,
      status: bot.status,
      symbol: bot.symbol,
      deposit: bot.deposit,
      profit_percentage: bot.profit_percentage,
      num_orders: bot.num_orders,
      grid_length: bot.grid_length,
      isPublic: bot.isPublic,
    };
  }
} 