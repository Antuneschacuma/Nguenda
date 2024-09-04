import { Presenca } from "../../entities/presenca";
import { TipoAcao } from "../../entities/tipo_acao";

export interface MarcarPresencaPort{
    execute({codigoConvidado, tipoAcao}:{codigoConvidado: string,tipoAcao:TipoAcao}):Promise<Presenca>;
}
