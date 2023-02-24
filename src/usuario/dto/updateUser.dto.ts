import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { IsSigleEmail } from '../validacao/isSigleEmail.validator';

export class UpdateUserDTO {
  @IsNotEmpty({ message: 'O name não pode ser vazio.' })
  @IsOptional()
  name: string;

  @IsEmail(undefined, { message: 'O e-mail informado é inválido.' })
  @IsSigleEmail({ message: 'Já existe um usuário com este e-mail.' })
  @IsOptional()
  email: string;

  @MinLength(6, { message: 'A password precisa ter pelo menos 6 caracteres.' })
  @IsOptional()
  password: string;
}
