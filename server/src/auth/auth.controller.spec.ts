import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Req } from '@nestjs/common';

describe('Auth Controller', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, LocalStrategy, JwtStrategy],
    }).compile();

    authController = app.get<AuthController>(AuthController);
    authService = app.get<AuthService>(AuthService);
  });

  it.skip('should be defined', () => {
    expect(authController).toBeDefined();
  });

  // describe('auth/login', () => {
  //   it('should return authenticated user', async () => {
  //     const result =
  //       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlN2I2ZmNhZDhlMGVmM2MzY2Y4NWQyOSIsImVtYWlsIjoiamJpbGxheUBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJCaWxsYXkiLCJsYXN0TmFtZSI6IkplcmVteSIsInBpY3R1cmUiOiJodHRwczovL2dyYXZhdGFyLmNvbS9hdmF0YXIvNzU5Mjg5YzJiNjAyODE4MjZlNzExMDhjMmU2MDM5Njk_cz0yMDAiLCJpYXQiOjE1ODUxNDgyNzEsImV4cCI6MTU4NTc1MzA3MX0.VzWhdoD3Aq-VZesnXDktbELkUs6--QYzijZsTUer7JA';
  //     jest.spyOn(authService, 'login').mockImplementation(() => result);

  //     expect(await authController.login({ req: { user: {} }})).toBe('Jeremy Billay !');
  //   });
  // });
});
