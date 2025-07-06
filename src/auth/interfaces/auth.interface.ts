export interface LoginRequest {
  /**
   * Username
   * @example "john_doe"
   */
  username: string;

  /**
   * Password
   * @example "password"
   */
  password: string;
}

export interface RegisterRequest {
  /**
   * Username
   * @example "john_doe"
   */
  username: string;

  /**
   * Password
   * @example "password"
   */
  password: string;
}

export interface TokenData {
  /**
   * JWT for access to protected endpoints
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  access_token: string;

  /**
   * JWT for refreshing access_token
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  refresh_token?: string;

  /**
   * Lifetime of access_token in seconds
   * @example 3600
   */
  access_expires: number;

  /**
   * Lifetime of refresh_token in seconds
   * @example 86400
   */
  refresh_expires?: number;

  /**
   * Token type — always "Bearer"
   */
  token_type: 'Bearer';
}

export interface JwtPayload {
  sub: string;
  username: string;
  iat?: number;
  exp?: number;
} 