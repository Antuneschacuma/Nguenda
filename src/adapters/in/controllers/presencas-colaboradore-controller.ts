import { Presenca } from "../../../core/entities";
import { PresencasColaboradorPort } from "../../../core/ports/in/presencas-colaborador-port";
import { BuscarPrsencaPorIdDTO } from "../../../dtos/buscar_presencas_por_id_dto";
import { PresencaDTO } from "../../../dtos/presenca_dto";

export class PresencasColaboradorController{

    constructor(private presencasColaborador:PresencasColaboradorPort){}

    public async buscar(data:BuscarPrsencaPorIdDTO):Promise<PresencaDTO[] | null>{
        const presencas: Presenca[] | null = await this.presencasColaborador.execute({id:data.id,startDate:data.startDate,endDate:data.endDate});

        if (!presencas) return null;
    
        return presencas.map((presenca) => {
          return new PresencaDTO(
            presenca.getColaborador().getId(),
            presenca.getColaborador().getName(),
            presenca.getEntrada(),
            presenca.getSaida() || null,
          );
        });
    }
}