import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BotsService } from './bots.service';
import { BotCreateDto } from './dto/bot-create.dto';
import { BotResponseDto } from './dto/bot-response.dto';
import { BotStatisticResponseDto } from './dto/bot-statistic-response.dto';
import { BotUpdateDto } from './dto/bot-update.dto';

@ApiTags('bots')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('bots')
export class BotsController {
  constructor(private readonly botsService: BotsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new bot' })
  @ApiResponse({
    status: 201,
    description: 'Bot successfully created',
    type: BotResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async createBot(
    @Request() req,
    @Body() createBotDto: BotCreateDto,
  ): Promise<BotResponseDto> {
    return this.botsService.createBot(req.user.userId, createBotDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of all user bots' })
  @ApiResponse({
    status: 200,
    description: 'List of bots received',
    type: [BotResponseDto],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getAllBots(@Request() req): Promise<BotResponseDto[]> {
    return this.botsService.getAllBots(req.user.userId);
  }



  @Put()
  @ApiOperation({ summary: 'Update a bot' })
  @ApiResponse({
    status: 200,
    description: 'Bot successfully updated',
    type: BotResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Bot not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateBot(
    @Request() req,
    @Body() updateBotDto: BotUpdateDto,
  ): Promise<BotResponseDto> {
    return this.botsService.updateBot(req.user.userId, updateBotDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a bot' })
  @ApiParam({ name: 'id', description: 'Bot ID' })
  @ApiResponse({ status: 200, description: 'Bot successfully deleted' })
  @ApiResponse({ status: 404, description: 'Bot not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async deleteBot(@Request() req, @Param('id') id: string): Promise<void> {
    return this.botsService.deleteBot(req.user.userId, id);
  }





  @Get('statistics')
  @ApiOperation({ summary: 'Get statistics for all user bots' })
  @ApiResponse({
    status: 200,
    description: 'Statistics received',
    type: [BotStatisticResponseDto],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getBotStatistics(@Request() req): Promise<BotStatisticResponseDto[]> {
    return this.botsService.getBotStatistics(req.user.userId);
  }
}

