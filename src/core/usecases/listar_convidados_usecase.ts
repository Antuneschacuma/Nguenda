import { Colaborador } from "../entities";
import { BuscarListaColaboradoresPort } from "../ports/in/listar_convidados_port";

import { BuscarListaColaboradoresRepositoryPort } from "../ports/out/repository/listar_convidados_repository_port";

export class BuscarListaColaboradores implements BuscarListaColaboradoresPort {
  constructor(
    private buscarListaColaboradoresRepository:BuscarListaColaboradoresRepositoryPort
  ) {}
    execute():Promise<Colaborador[]> {
        return this.buscarListaColaboradoresRepository.findAllColaboradores();
    }
 
}
