import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString, Max, Min } from 'class-validator';

export class BotCreateDto {
  @ApiProperty({
    description: 'Readable bot name',
    example: 'DCA Bot BTCUSDT',
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
    example: 1000,
  })
  @IsNumber()
  @IsPositive()
  deposit: number;

  @ApiProperty({
    description: 'Desired profit percentage (e.g. 0.5 = 0.5%)',
    example: 0.5,
  })
  @IsNumber()
  @IsPositive()
  profit_percentage: number;

  @ApiProperty({
    description: 'Number of grid orders (integer > 0)',
    example: 10,
  })
  @IsNumber()
  @IsPositive()
  @Min(1)
  num_orders: number;

  @ApiProperty({
    description: 'Grid length (%) between the first and last order (0 < grid_length < 100)',
    example: 5.0,
  })
  @IsNumber()
  @IsPositive()
  @Min(0.1)
  @Max(99.9)
  grid_length: number;
} 