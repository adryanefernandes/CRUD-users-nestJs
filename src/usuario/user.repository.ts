import { Injectable } from '@nestjs/common';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  async save(usuario: UserEntity): Promise<void> {
    this.users.push(usuario);
  }

  async list(): Promise<UserEntity[]> {
    return this.users;
  }

  async existWithSameEmail(email: string): Promise<boolean> {
    const user: UserEntity = this.users.find((user) => user.email === email);
    return !!user;
  }

  async update(id: string, data: Partial<UpdateUserDTO>): Promise<UserEntity> {
    const user: UserEntity = this.searchById(id);

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'id') return;
      user[key] = value;
    });

    return user;
  }

  async delete(id: string): Promise<UserEntity> {
    const user: UserEntity = this.searchById(id);
    this.users = this.users.filter((u) => u.id !== id);

    return user;
  }

  private searchById(id: string): UserEntity {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new Error('Usuário não existe.');
    }

    return user;
  }
}
