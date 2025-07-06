import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString, Max, Min } from 'class-validator';

export class BotUpdateDto {
  @ApiProperty({
    description: 'Unique bot identifier',
    example: 'clh7x8y9z0001abc123def456',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Readable bot name',
    example: 'DCA Bot BTCUSDT Updated',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Trading pair',
    example: 'BTCUSDT',
  })
  @IsString()
  symbol: string;

  @ApiProperty({
    description: 'Deposit in the quoted currency (e.g. USDT)',
    example: 1500,
  })
  @IsNumber()
  @IsPositive()
  deposit: number;

  @ApiProperty({
    description: 'Desired profit percentage (e.g. 0.5 = 0.5%)',
    example: 0.7,
  })
  @IsNumber()
  @IsPositive()
  profit_percentage: number;

  @ApiProperty({
    description: 'Number of grid orders (integer > 0)',
    example: 12,
  })
  @IsNumber()
  @IsPositive()
  @Min(1)
  num_orders: number;

  @ApiProperty({
    description: 'Grid length (%) between the first and last order (0 < grid_length < 100)',
    example: 7.5,
  })
  @IsNumber()
  @IsPositive()
  @Min(0.1)
  @Max(99.9)
  grid_length: number;
} 