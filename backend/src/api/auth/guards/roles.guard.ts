import { Injectable, CanActivate, ExecutionContext, ForbiddenException} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      throw new ForbiddenException('Нет доступа: пользователь не авторизован');
    }

    if (!user.roles || !Array.isArray(user.roles)) {
      throw new ForbiddenException('Нет доступа: роли не определены');
    }

    const hasAccess = requiredRoles.some((role) => user.roles.includes(role));

    if (!hasAccess) {
      throw new ForbiddenException('Недостаточно прав для доступа');
    }

    return true;
  }
}
