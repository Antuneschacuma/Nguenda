import { MarcarPresencaPort } from "../../../core/ports/in";
import { MarcarPresencaDTO } from "../../../dtos/marcar-presenca-dto";
import { PresencaDTO } from "../../../dtos/presenca_dto";

export class MarcarPresencaController{

    constructor(private marcarPresencaPort: MarcarPresencaPort){}

    public async criar(data:MarcarPresencaDTO):Promise<PresencaDTO>{

        const presenca=await this.marcarPresencaPort.execute({codigoColaborador:data.codigoColaborador,tipoAcao:data.tipoAcao});

          return new PresencaDTO(
            presenca.getColaborador().getId(),
            presenca.getColaborador().getName(),
            presenca.getEntrada(),
            presenca.getSaida() || null,);
    }
}