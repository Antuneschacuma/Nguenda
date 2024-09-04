import { Convidado } from "../entities/convidado";
import { Presenca } from "../entities/presenca";
import { CadastrarConvidadoPort } from "../ports/in/cadastrar_convidado_port";
import { CadastrarConvidadoRepositoryPort } from "../ports/out/repository/cadastrar_convidado_repository_port";

export class CadastrarConvidado implements CadastrarConvidadoPort {
  constructor(private cadastrarConvidado: CadastrarConvidadoRepositoryPort) {}
  async execute({
    id,
    name,
    email,
    presenca,
    qrCode,
  }: {
    id: string;
    name: string;
    email: string;
    presenca: Presenca[];
    qrCode: string;
  }): Promise<Convidado> {
    const convidado = new Convidado({
      id,
      name,
      email,
      presenca,
      qrCode,
    });

    return await this.cadastrarConvidado.save(convidado);
  }
}
