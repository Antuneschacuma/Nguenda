import { IsDate, IsOptional } from 'class-validator';

export class BuscarPresencaDTO {
  
  @IsOptional()
  startDate?: Date;

  @IsOptional()
  endDate?: Date;
}
