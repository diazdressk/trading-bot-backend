import { ApiProperty } from '@nestjs/swagger';

export class BotStatisticResponseDto {
  @ApiProperty({
    description: 'Bot ID',
    example: 'clh7x8y9z0001abc123def456',
  })
  id: string;

  @ApiProperty({
    description: 'Readable bot name',
    example: 'DCA Bot BTCUSDT',
  })
  name: string;

  @ApiProperty({
    description: 'Trading pair, e.g. "BTCUSDT"',
    example: 'BTCUSDT',
  })
  symbol: string;

  @ApiProperty({
    description: 'How many cycles have been completed',
    example: 5,
  })
  cycles_completed: number;

  @ApiProperty({
    description: 'Deposit in USDT',
    example: 1000,
  })
  deposit_usdt: number;

  @ApiProperty({
    description: 'Total profit in USDT',
    example: 50,
  })
  profit_usdt: number;

  @ApiProperty({
    description: 'Profit percentage: profit / deposit * 100',
    example: 5.0,
  })
  profit_percentage: number;
} 