import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PersonTypeGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const personTypes: string[] = this.reflector.get<string[]>(
      'personTypes',
      context.getHandler(),
    );
    if (!personTypes) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    const hasPersonType = personTypes.includes(user.personType.value);
    return user && user.personType && hasPersonType;
  }
}
