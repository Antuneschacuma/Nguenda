// adapters/in/controllers/criar-colaborador-controller.ts

import { CriarColaboradorDTO } from "../../../dtos/criar-colaborador-dto";
import { ColaboradorDTO } from "../../../dtos/colaborador_dto";
import { CadastrarConvidadoPort } from "../../../core/ports/in/cadastrar_convidado_port";
import { Presenca } from "../../../core/entities/presenca";

export class CadastrarConvidadoController {

  constructor(private cadastrarConvidado: CadastrarConvidadoPort) {}

  public async criar(data: CriarColaboradorDTO): Promise<ColaboradorDTO> {
    const presencas: Presenca[] = [];
    
    const convidado = await this.cadastrarConvidado.execute({
      name: data.name,
      email: data.email,
      presenca: presencas,
      qrCode: data.qrCode,
    });

    return new ColaboradorDTO(convidado.getId(), convidado.getName());
  }
}
