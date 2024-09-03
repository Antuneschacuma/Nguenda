import { Presenca } from "../../entities";

export interface BuscarPresencaPort {
  execute({ colaboradorId }:{colaboradorId:string}): Promise<Presenca | null>;
}
