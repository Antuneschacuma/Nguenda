import { Convidado } from "../../entities/convidado";

export interface BuscarListaConvidadosPort{
    execute():Promise<Convidado[]>;

}