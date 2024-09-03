import { Colaborador } from "../../entities";

export interface BuscarColaboradorPort{
    execute({codigo}: {codigo: string}): Promise<Colaborador>
}