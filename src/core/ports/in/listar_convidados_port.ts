import { Colaborador } from "../../entities";

export interface BuscarListaColaboradoresPort{
    execute():Promise<Colaborador[]>;

}