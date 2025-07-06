import { ApiProperty } from '@nestjs/swagger';

export class BotResponseDto {
  @ApiProperty({
    description: 'Unique identifier',
    example: 'clh7x8y9z0001abc123def456',
  })
  id: string;

  @ApiProperty({
    description: 'Readable name',
    example: 'DCA Bot BTCUSDT',
  })
  name: string;

  @ApiProperty({
    description: 'Bot status',
    enum: ['ACTIVE', 'PAUSE', 'ERROR'],
    example: 'ACTIVE',
  })
  status: 'ACTIVE' | 'PAUSE' | 'ERROR';

  @ApiProperty({
    description: 'Trading pair, e.g. "BTCUSDT"',
    example: 'BTCUSDT',
  })
  symbol: string;

  @ApiProperty({
    description: 'Deposit in the quoted currency (e.g. USDT)',
    example: 1000,
  })
  deposit: number;

  @ApiProperty({
    description: 'Desired profit percentage (e.g. 0.5 = 0.5%)',
    example: 0.5,
  })
  profit_percentage: number;

  @ApiProperty({
    description: 'Number of grid orders (integer > 0)',
    example: 10,
  })
  num_orders: number;

  @ApiProperty({
    description: 'Grid length (%) between the first and last order (0 < grid_length < 100)',
    example: 5.0,
  })
  grid_length: number;

  @ApiProperty({
    description: 'Is the bot public (true) or user\'s (false)',
    example: false,
  })
  isPublic: boolean;
} 