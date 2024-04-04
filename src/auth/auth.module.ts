import { Module } from '@nestjs/common';
import { AuthService } from 'auth/auth.service';
import { UsersModule } from 'users/users.module';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from 'auth/session.serializer';
import { LocalStrategy } from 'auth/strategies/local.strategy';
import { FacebookStrategy } from 'auth/strategies/facebook.strategy';
import { AuthController } from './auth.controller';
import { RoleService } from './RBAC/role.service';

@Module({
  imports: [UsersModule, PassportModule.register({ session: true })],
  providers: [
    AuthService,
    LocalStrategy,
    FacebookStrategy,
    SessionSerializer,
    RoleService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
