import { Colaborador, Presenca } from "../entities";
import { BuscarPresencaPort } from "../ports/in";
import { BuscarPresencaRepositoryPort } from "../ports/out/repository";

export class BuscarPresenca implements BuscarPresencaPort {
  constructor(
    private buscarPresencaRepository: BuscarPresencaRepositoryPort
  ) {}
  async execute({ colaboradorId }:{colaboradorId:string}): Promise<Presenca | null> {
    return await this.buscarPresencaRepository.findByColaboradorId({colaboradorId})
  }

}
