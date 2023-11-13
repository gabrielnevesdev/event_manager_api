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
import { UserProfileService } from './user_profile.service';
import { CreateUserProfileDto } from './dto/create-user_profile.dto';
import { UpdateUserProfileDto } from './dto/update-user_profile.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtPayload } from 'jsonwebtoken';

@ApiBearerAuth()
@ApiTags('User Profiles')
@Controller('user_profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new user profile' })
  @ApiBody({ type: CreateUserProfileDto })
  create(
    @Body() createUserProfileDto: CreateUserProfileDto,
    @Request() req: JwtPayload,
  ) {
    return this.userProfileService.create(createUserProfileDto, req);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'List all user profiles' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: [CreateUserProfileDto],
  })
  findAll() {
    return this.userProfileService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get an user profile by id' })
  @ApiParam({ name: 'id', description: 'User Profile id' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: CreateUserProfileDto,
  })
  findOne(@Param('id') id: string) {
    return this.userProfileService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update an user profile by id' })
  @ApiParam({ name: 'id', description: 'User Profile id' })
  @ApiBody({ type: CreateUserProfileDto })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: CreateUserProfileDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
    @Request() req: JwtPayload,
  ) {
    return this.userProfileService.update(id, updateUserProfileDto, req);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Remove an user profile by id' })
  @ApiParam({ name: 'id', description: 'User Profile id' })
  remove(@Param('id') id: string, @Request() req: JwtPayload) {
    return this.userProfileService.remove(id, req);
  }
}
