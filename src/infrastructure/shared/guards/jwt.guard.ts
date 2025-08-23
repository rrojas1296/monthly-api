import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '../jwt.service';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private _jwtService: JwtService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies['accessToken'];
    if (!token) throw new UnauthorizedException('No access token');

    try {
      const payload = await this._jwtService.verify(token, 'accessToken');
      request.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
