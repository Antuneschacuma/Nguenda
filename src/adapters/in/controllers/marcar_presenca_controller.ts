import { MarcarPresencaPort } from "../../../core/ports/in/marcar_presenca_port";
import { MarcarPresencaDTO } from "../../../dtos/marcar-presenca-dto";
import { PresencaDTO } from "../../../dtos/presenca_dto";

export class MarcarPresencaController{

    constructor(private marcarPresencaPort: MarcarPresencaPort){}

    public async criar(data:MarcarPresencaDTO):Promise<PresencaDTO>{

        const presenca=await this.marcarPresencaPort.execute({codigoConvidado:data.codigoColaborador,tipoAcao:data.tipoAcao});

          return new PresencaDTO(
            presenca.getConvidado().getId(),
            presenca.getConvidado().getName(),
            presenca.getEntrada(),
            presenca.getSaida() || null,);
    }
}