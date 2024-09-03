import { IsBoolean, IsInt, Min } from 'class-validator';

export class HorarioLaboralDTO {

  @IsInt()
  @Min(0, { message: 'A hora regular deve ser um número inteiro positivo.' })
  horaRegular!: number;

  @IsInt()
  @Min(0, { message: 'A hora extra deve ser um número inteiro positivo.' })
  horaExtra!: number;

  @IsBoolean({ message: 'O campo active deve ser um valor booleano.' })
  active!: boolean;
}
