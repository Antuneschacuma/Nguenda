import { Colaborador, Presenca } from "../entities";

import { CadastrarColaboradorPort } from "../ports/in";
import { CadastrarColaboradorRepositoryPort } from "../ports/out/repository";

export class CadastrarColaborador implements CadastrarColaboradorPort {
  constructor(
    private cadastrarColaborador: CadastrarColaboradorRepositoryPort
  ) {}
  async execute({
    id,
    name,
    email,
    telefone,
    presenca,
    qrCode,
  }: {
    id: string;
    name: string;
    email: string;
    telefone: string;
    presenca: Presenca[];
    qrCode: string;
  }): Promise<Colaborador> {
    const colaborador = new Colaborador({
      id,
      name,
      email,
      telefone,
      presenca: presenca || [],
      qrCode,
    });
    colaborador.validate();
    return await this.cadastrarColaborador.save(colaborador);
  }
}
