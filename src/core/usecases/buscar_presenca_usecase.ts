import { Presenca } from "../entities/presenca";
import { BuscarPresencaPort } from "../ports/in/buscar_presenca_port";
import { BuscarPresencaRepositoryPort } from "../ports/out/repository/buscar_presenca_repository_port";

export class BuscarPresenca implements BuscarPresencaPort {
  constructor(
    private buscarPresencaRepository: BuscarPresencaRepositoryPort
  ) {}
  async execute({ convidadoId }:{convidadoId:string}): Promise<Presenca | null> {
    return await this.buscarPresencaRepository.findByColaboradorId({convidadoId})
  }

}
