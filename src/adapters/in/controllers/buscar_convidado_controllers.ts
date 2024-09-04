import { Convidado } from "../../../core/entities/convidado";
import { BuscarConvidadoPort } from "../../../core/ports/in/buscar_convidado_port";
import { BuscarColaboradorDto } from "../../../dtos/buscar_colaborador_dto";
import { ColaboradorDTO } from "../../../dtos/colaborador_dto";
export class BuscarConvidadoController {
  
  constructor(private buscarConvidado: BuscarConvidadoPort) {}

  public async buscar(params:BuscarColaboradorDto): Promise<ColaboradorDTO | null> {
    const convidado: Convidado| null = await this.buscarConvidado.execute({codigo:params.codigo});

    if (!convidado) return null;
    
      return new ColaboradorDTO(
        convidado.getId(),
        convidado.getName(),
      );
  }
}
