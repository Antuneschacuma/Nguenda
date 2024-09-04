import { Presenca } from "../../entities/presenca";

export interface BuscarListaPresencaPort {
    execute({startDate,endDate}:{startDate?: Date, endDate?: Date}): Promise<Presenca[]>;
}
