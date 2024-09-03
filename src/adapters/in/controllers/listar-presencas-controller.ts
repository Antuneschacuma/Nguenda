import { Presenca } from "../../../core/entities";
import { BuscarListaPresencaPort } from "../../../core/ports/in";
import { BuscarPresencaDTO } from "../../../dtos/buscar_presencas_dto";
import { PresencaDTO } from "../../../dtos/presenca_dto";

export class BuscarListaPresencaController {
  constructor(private buscarListaPresenca: BuscarListaPresencaPort) {}

  public async listar(data: BuscarPresencaDTO): Promise<PresencaDTO[] | null> {
    const presencas: Presenca[] | null = await this.buscarListaPresenca.execute({startDate:data.startDate,endDate:data.endDate});

    if (!presencas) return null;

    return presencas.map((presenca) => {
      return new PresencaDTO(
        presenca.getColaborador().getId(),
        presenca.getColaborador().getName(),
        presenca.getEntrada(),
        presenca.getSaida() || null,
      );
    });
  }
}
