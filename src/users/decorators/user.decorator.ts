import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { users } from '@prisma/client';

export const AuthUser = createParamDecorator(
  (data: keyof users, ctx: ExecutionContext) => {
    const user = ctx.switchToHttp().getRequest().user as users;
    return data ? user && user[data] : user;
  },
);
