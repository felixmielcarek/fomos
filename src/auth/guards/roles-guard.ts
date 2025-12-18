import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/roles.enum';
import { UserDto } from 'src/users/dtos/user.dto';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );
        if (!requiredRoles) return true;

        const user: UserDto = context.switchToHttp().getRequest().user;

        return requiredRoles.some((role) => user.role === role);
    }
}
