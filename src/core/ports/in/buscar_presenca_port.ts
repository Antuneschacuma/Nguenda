import { Presenca } from "../../entities/presenca";

export interface BuscarPresencaPort {
  execute({ convidadoId }:{convidadoId:string}): Promise<Presenca | null>;
}
