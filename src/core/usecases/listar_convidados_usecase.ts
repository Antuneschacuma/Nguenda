import { Convidado } from "../entities/convidado";
import { BuscarListaConvidadosPort } from "../ports/in/listar_convidados_port";
import { BuscarListaConvidadosRepositoryPort } from "../ports/out/repository/listar_convidados_repository_port";

export class BuscarListaConvidados implements BuscarListaConvidadosPort {
  constructor(
    private buscarListaConvidadosRepository:BuscarListaConvidadosRepositoryPort
  ) {}
    execute():Promise<Convidado[]> {
        return this.buscarListaConvidadosRepository.findAllColaboradores();
    }
 
}
