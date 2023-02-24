import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { IsSigleEmailValidator } from './validacao/isSigleEmail.validator';

@Module({
  controllers: [UserController],
  providers: [UserRepository, IsSigleEmailValidator],
})
export class UserModule {}
