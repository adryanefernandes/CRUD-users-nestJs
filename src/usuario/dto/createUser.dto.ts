import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { IsSigleEmail } from '../validacao/isSigleEmail.validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'O name não pode ser vazio.' })
  name: string;

  @IsEmail(undefined, { message: 'O e-mail informado é inválido.' })
  @IsSigleEmail({ message: 'Já existe um usuário com este e-mail.' })
  email: string;

  @MinLength(6, { message: 'A password precisa ter pelo menos 6 caracteres.' })
  password: string;
}
