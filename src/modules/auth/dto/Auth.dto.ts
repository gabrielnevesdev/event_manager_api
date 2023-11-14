import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({
    description: 'Email is a unique field used to login',
    type: 'string',
    example: 'exemplo@test.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User Password',
    type: 'string',
    example: 'Test@exemple',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class TokenResponseDto {
  @ApiProperty({
    description: 'Access token for authentication',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyODc3NzBlYS0zOGY0LTQzOGItYWNjOS1kZDZjZTQzYTQ3YjIiLCJ1c2VybmFtZSI6ImdhYnJpZWxuZXZlczU5LmduIiwiZW1haWwiOiJnYWJyaWVsbmV2ZXM1OS5nbkBnbWFpbC5jb20iLCJpYXQiOjE2OTk4NDQyMTAsImV4cCI6MTY5OTg0NzgxMH0.yHsABoLi_c-g-oP4UzKvchLwHOPU-PZeqSzWRgq4ZIQ',
  })
  access_token: string;
}
