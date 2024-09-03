import { IsString, Length } from "class-validator";
import { TipoAcao } from "../core/entities/tipo_acao";

export class MarcarPresencaDTO {
  @IsString({ message: "codigo tem que ser string" })
  @Length(2, 50, { message: "2 a 50 caracteres maximo" })
  codigoColaborador!: string;

  @IsString({ message: "A obs deve ser string" })
  @Length(2, 50, { message: "2 a 50 caracteres maximo" })
  tipoAcao!:TipoAcao;
}
