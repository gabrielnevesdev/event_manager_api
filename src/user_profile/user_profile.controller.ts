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
import { UserProfileService } from './user_profile.service';
import { CreateUserProfileDto } from './dto/create-user_profile.dto';
import { UpdateUserProfileDto } from './dto/update-user_profile.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtPayload } from 'jsonwebtoken';

@Controller('user_profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() createUserProfileDto: CreateUserProfileDto,
    @Request() req: JwtPayload,
  ) {
    return this.userProfileService.create(createUserProfileDto, req);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.userProfileService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userProfileService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
    @Request() req: JwtPayload,
  ) {
    return this.userProfileService.update(id, updateUserProfileDto, req);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: JwtPayload) {
    return this.userProfileService.remove(id, req);
  }
}
