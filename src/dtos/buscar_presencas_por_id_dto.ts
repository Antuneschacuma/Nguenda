import { IsOptional, IsString, Length } from 'class-validator';

export class BuscarPrsencaPorIdDTO {
  //@IsString({ message: 'O id deve ser uma string.' })
  //@Length(5, 50, { message: 'O id deve ter entre 5 e 50 caracteres.' })
  id!: string;

  @IsOptional()
  startDate?: Date;

  @IsOptional()
  endDate?: Date;
}
