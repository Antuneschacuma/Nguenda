// adapters/in/controllers/criar-colaborador-controller.ts

import { CriarColaboradorDTO } from "../../../dtos/criar-colaborador-dto";
import { CadastrarColaboradorPort } from "../../../core/ports/in/cadastrar_convidado_port";
import { Presenca } from "../../../core/entities";
import { ColaboradorDTO } from "../../../dtos/colaborador_dto";

export class CadastrarColaboradorController {
  constructor(private cadastrarColaborador: CadastrarColaboradorPort) {}

  public async criar(data: CriarColaboradorDTO): Promise<ColaboradorDTO> {
    const presencas: Presenca[] = [];
    
    const colaborador = await this.cadastrarColaborador.execute({
      name: data.name,
      email: data.email,
      telefone: data.telefone,
      presenca: presencas,
      qrCode: data.qrCode,
    });

    return new ColaboradorDTO(colaborador.getId(), colaborador.getName());
  }
}
