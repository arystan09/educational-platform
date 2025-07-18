import { Controller, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard) // Это применяется ко всем маршрутам в контроллере. Можно и на уровне метода.
export class UsersController {
  @Roles('ADMIN')
  @Get('protected')
  getAdminData(@CurrentUser() user) {
    return { message: `Welcome, ${user.email}` };
  }
}
