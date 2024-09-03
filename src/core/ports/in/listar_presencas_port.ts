import { Presenca } from "../../entities";

export interface BuscarListaPresencaPort {
    execute({startDate,endDate}:{startDate?: Date, endDate?: Date}): Promise<Presenca[]>;
}
