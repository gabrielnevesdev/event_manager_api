import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthDto, TokenResponseDto } from './dto/Auth.dto';
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Authenticate and log in' })
  @ApiBody({ type: AuthDto })
  @ApiResponse({
    status: 200,
    description: 'Authentication successful',
    type: TokenResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Authentication failed',
  })
  async login(@Body() credentials: AuthDto) {
    const token = await this.authService.login(
      credentials.email,
      credentials.password,
    );
    return { token };
  }
}
