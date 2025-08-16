import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaFileDto } from './dto/create-media-file.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';

@Controller('courses/:courseId/media')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  create(@Param('courseId') courseId: string, @Body() createMediaFileDto: CreateMediaFileDto) {
    return this.mediaService.create(courseId, createMediaFileDto);
  }

  @Get()
  findAll(@Param('courseId') courseId: string) {
    return this.mediaService.findAllByCourse(courseId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mediaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMediaFileDto: Partial<CreateMediaFileDto>) {
    return this.mediaService.update(id, updateMediaFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mediaService.remove(id);
  }
} 