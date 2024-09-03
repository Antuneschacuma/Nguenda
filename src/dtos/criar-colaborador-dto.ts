import { IsEmail, IsString, IsArray, Length, Matches } from 'class-validator';

export class CriarColaboradorDTO {

  @IsString({ message: 'O nome deve ser uma string' })
  @Length(2, 50, { message: '2 a 50 caracteres maximo' })
  name!: string;

  @IsEmail({}, { message: 'O email deve ser válido' })
  email!: string;

  @IsString({ message: 'O telefone deve ser uma string' })
  telefone!: string;

  @IsString({ message: 'O QR Code deve ser uma string' })
  qrCode!: string;
}
