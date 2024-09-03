import { IsString, Length } from 'class-validator';

export class BuscarColaboradorDto {
  @IsString({ message: 'O código deve ser uma string.' })
  @Length(8, 50, { message: 'O código deve ter entre 5 e 20 caracteres.' })
  codigo!: string;
}
