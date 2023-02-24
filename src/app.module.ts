import { Module } from '@nestjs/common';
import { UserModule } from './usuario/user.module';

@Module({
  imports: [UserModule],
})
export class AppModule {}
