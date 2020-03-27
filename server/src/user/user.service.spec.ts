import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';

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

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken('User'),
          useValue: UserModel,
        },
      ],
    }).compile();
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('UserService getByEmail', () => {
    it('Test getByEmail with correct email', async () => {
      const receivedUser = await service.getByEmail('jbillay@gmail.com');
      expect(receivedUser).toStrictEqual(userModel);
    });
  });

  describe('UserService create', () => {
    it('Test create with correct email', async () => {
      const receivedUser = await service.create({
        email: 'jbillay@gmail.com',
        password: 'test',
        firstName: 'Jeremy',
        lastName: 'Billay',
      });
      expect(receivedUser.email).toBe('jbillay@gmail.com');
      expect(receivedUser.firstName).toBe('Jeremy');
      expect(receivedUser.lastName).toBe('Billay');
      expect(receivedUser.picture).toBe(
        'https://gravatar.com/avatar/759289c2b60281826e71108c2e603969?s=200',
      );
      expect(receivedUser.password).toBeDefined();
    });
  });
});
