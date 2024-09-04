import { BuscarListaConvidadosPort } from "../../../core/ports/in/listar_convidados_port";
import { ColaboradorDTO } from "../../../dtos/colaborador_dto";
import { Convidado } from "../../../core/entities/convidado";

export class BuscarListaConvidadosController {
  

  constructor(private buscarListaConvidados: BuscarListaConvidadosPort) {}

  public async listar(): Promise<ColaboradorDTO[] | null> {
    const convidados: Convidado[] | null = await this.buscarListaConvidados.execute();

    if (!convidados) return null;

    return convidados.map((convidado) => {
      return new ColaboradorDTO(
        convidado.getId(),
        convidado.getName(),
      );
    });
  }
}
