import { Colaborador } from "../../../core/entities";
import { BuscarListaColaboradoresPort } from "../../../core/ports/in/listar_convidados_port";
import { ColaboradorDTO } from "../../../dtos/colaborador_dto";

export class BuscarListaColaboradoresController {
  

  constructor(private buscarListaColaboradores: BuscarListaColaboradoresPort) {}

  public async listar(): Promise<ColaboradorDTO[] | null> {
    const colaboradores: Colaborador[] | null = await this.buscarListaColaboradores.execute();

    if (!colaboradores) return null;

    return colaboradores.map((colaborador) => {
      return new ColaboradorDTO(
        colaborador.getId(),
        colaborador.getName(),
      );
    });
  }
}
