import { Convidado } from "../../entities/convidado";

export interface BuscarConvidadoPort{
    execute({codigo}: {codigo: string}): Promise<Convidado>
}