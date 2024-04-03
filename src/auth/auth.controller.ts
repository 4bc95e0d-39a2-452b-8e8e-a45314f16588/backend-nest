import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'auth/auth.service';
import { SignInDto } from 'users/dto/sign-in.dto';
import { CreateUserDto } from '@users/dto/create.user.dto';
import * as secureSession from '@fastify/secure-session';
import { FastifyRequest } from 'fastify';
import { LocalGuard } from 'auth/guards/local.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { FacebookGuard } from './guards/facebook.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() credentials: any,
    @Session() session: Record<string, any>,
  ) {
    const user = await this.authService.register(credentials.email, credentials.password);
    session.userId = user.id;
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Request() request, @Body() signInDto: SignInDto) {
    return {
      user: request.user,
      message: 'Login successful',
    };
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(FacebookGuard)
  @Get('facebook')
  async loginWithFacebook() {
    return {
      message: 'Redirecting to facebook...',
    };
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(FacebookGuard)
  @Get('facebook/callback')
  async facebookCallback(@Request() request: Record<string, any>) {
    return {
      user: request.user,
      message: 'Login successful',
    };
  }

  @Post('logout')
  async logout(@Session() session: Record<string, any>) {
    await session.destroy();
    return {
      message: 'Logout successful',
      statusCode: HttpStatus.OK,
    };
  }

  @Get('status')
  @UseGuards(AuthenticatedGuard)
  async status(
    @Session() session: secureSession.Session,
    @Request() request: FastifyRequest,
  ) {
    return {
      message: 'Session status',
      statusCode: HttpStatus.OK,
      session,
      user: request.user,
    };
  }
}