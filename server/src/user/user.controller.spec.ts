import { getModelToken } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';

const userModel = {
  id: '5e769cf15a53885a405c3d75',
  email: 'jbillay@gmail.com',
  firstName: 'Jeremy',
  lastName: 'Billay',
  fullName: 'Jeremy Billay',
};
class UserModel {
  constructor(private data) {}
  save = jest.fn().mockResolvedValue(this.data);
  static find = jest.fn().mockResolvedValue([userModel]);
  static findOne = jest.fn().mockResolvedValue(userModel);
  static findOneAndUpdate = jest.fn().mockResolvedValue(userModel);
  static deleteOne = jest.fn().mockResolvedValue(true);
}

describe('User Controller', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserService, UserModel],
      controllers: [UserController]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
