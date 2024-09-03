import { Colaborador } from "../../../core/entities";
import { BuscarColaboradorPort } from "../../../core/ports/in";
import { BuscarColaboradorDto } from "../../../dtos/buscar_colaborador_dto";
import { ColaboradorDTO } from "../../../dtos/colaborador_dto";
export class BuscarColaboradorController {
  
  constructor(private buscarColaborador: BuscarColaboradorPort) {}

  public async buscar(params:BuscarColaboradorDto): Promise<ColaboradorDTO | null> {
    const colaborador: Colaborador | null = await this.buscarColaborador.execute({codigo:params.codigo});

    if (!colaborador) return null;
    
      return new ColaboradorDTO(
        colaborador.getId(),
        colaborador.getName(),
      );
  }
}
