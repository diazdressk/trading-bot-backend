import { ApiProperty } from '@nestjs/swagger';

export class TokenResponseDto {
  @ApiProperty({
    description: 'JWT for access to protected endpoints',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ZjQzZDk0MC1jNTBhLTRlM2QtYmFjMS1iNmJjZjk3MGRmMzYiLCJuYW1lIjoiam9obl9kb2UiLCJleHAiOjE3NTAwMDAwfQ.8brtrYCVGCnX2y_SWOEYfOR1ZUgznnbAYuP3iePmhbI',
  })
  access_token: string;

  @ApiProperty({
    description: 'JWT for refreshing access_token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ZjQzZDk0MC1jNTBhLTRlM2QtYmFjMS1iNmJjZjk3MGRmMzYiLCJuYW1lIjoiam9obl9kb2UiLCJleHAiOjE4MDAwMDAwMDB9.3XymrfNnG6XUL0DSG1WbvwmqjFsXGoaw_G5oK0tBMhY',
    required: false,
  })
  refresh_token?: string;

  @ApiProperty({
    description: 'Token type — always "Bearer"',
    example: 'Bearer',
  })
  token_type: 'Bearer';
} 