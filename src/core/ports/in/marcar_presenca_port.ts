import { Presenca } from "../../entities";
import { TipoAcao } from "../../entities/tipo_acao";

export interface MarcarPresencaPort{
    execute({codigoColaborador, tipoAcao}:{codigoColaborador: string,tipoAcao:TipoAcao}):Promise<Presenca>;
}
