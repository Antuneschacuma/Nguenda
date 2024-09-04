import { Convidado } from "../entities/convidado";
import { BuscarConvidadoPort } from "../ports/in/buscar_convidado_port";
import { BuscarConvidadoRepositoryPort } from "../ports/out/repository/buscar_convidado_repository_port";

export class BuscarConvidado implements BuscarConvidadoPort {
  constructor(private buscarConvidadoRepository: BuscarConvidadoRepositoryPort) {}

  async execute({ codigo }: { codigo: string; }): Promise<Convidado> {
     return await this.buscarConvidadoRepository.findByCodigo({ codigo });
  }
}
