import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateUserDTO } from './dto/createUser.dto';
import { ListUsersDTO } from './dto/listUsers.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Controller('/users')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  async criarUsuario(@Body() dados: CreateUserDTO): Promise<any> {
    const userEntity = new UserEntity();
    userEntity.email = dados.email;
    userEntity.name = dados.name;
    userEntity.password = dados.password;
    userEntity.id = uuid();

    this.userRepository.save(userEntity);

    return {
      usuario: new ListUsersDTO(userEntity.id, userEntity.name),
      message: 'Usuario criado com sucesso.',
    };
  }

  @Get()
  async listaUsuarios() {
    const usuarios = await this.userRepository.list();
    const usuariosLista: ListUsersDTO[] = usuarios.map(
      (u) => new ListUsersDTO(u.id, u.name),
    );

    return usuariosLista;
  }

  @Put('/:id')
  async atualizaUsuario(
    @Param('id') id: string,
    @Body() dadosParaAtualziar: UpdateUserDTO,
  ) {
    const usuarioAtualizado = await this.userRepository.update(
      id,
      dadosParaAtualziar,
    );

    return {
      usuario: usuarioAtualizado,
      message: 'Usuário atualizado com sucesso.',
    };
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const usuarioRemovido = await this.userRepository.delete(id);

    return {
      usuario: usuarioRemovido,
      message: 'Usuário removido com sucesso.',
    };
  }
}
