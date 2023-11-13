import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtPayload } from 'jsonwebtoken';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all user' })
  @ApiResponse({ status: 200, description: 'success', type: [CreateUserDto] })
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find an user by id' })
  @ApiParam({ name: 'id', description: 'user id' })
  @ApiResponse({ status: 200, description: 'success', type: CreateUserDto })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an user by id' })
  @ApiParam({ name: 'id', description: 'User id' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 200, description: 'success', type: CreateUserDto })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req: JwtPayload,
  ) {
    return this.usersService.update(id, updateUserDto, req);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove an user by Id' })
  @ApiParam({ name: 'id', description: 'User ID' })
  remove(@Param('id') id: string, @Request() req: JwtPayload) {
    return this.usersService.remove(id, req);
  }
}
