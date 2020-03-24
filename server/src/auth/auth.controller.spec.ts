import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Req } from '@nestjs/common';

describe('Auth Controller', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = app.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('auth/me', () => {
    it('should return "Jeremy Billay !"', () => {
      expect(authController.whoAmI({ user: {} })).toBe('Jeremy Billay !');
    });
  });
});
