import { Presenca } from "../entities/presenca";
import { BuscarListaPresencaPort } from "../ports/in/listar_presencas_port";
import { BuscarListaPresencaRepositoryPort } from "../ports/out/repository/listar_presencas_repository_port";

export class BuscarListaPresenca implements BuscarListaPresencaPort {
  constructor(
    private buscarListaPresencaRepository: BuscarListaPresencaRepositoryPort
  ) {}

  execute({startDate,endDate}:{startDate?: Date, endDate?: Date}): Promise<Presenca[]> {
    return this.buscarListaPresencaRepository.findAllPresencas({startDate,endDate});
  }
}
