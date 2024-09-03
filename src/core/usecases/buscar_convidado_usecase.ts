import { Colaborador } from "../entities";
import { BuscarColaboradorPort } from "../ports/in";
import { BuscarColaboradorRepositoryPort } from "../ports/out/repository"

export class BuscarColaborador implements BuscarColaboradorPort {
  constructor(private buscarColaboradorRepository: BuscarColaboradorRepositoryPort) {}

  async execute({ codigo }: { codigo: string; }): Promise<Colaborador> {
     return await this.buscarColaboradorRepository.findByCodigo({ codigo });
  }
}
