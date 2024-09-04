import { Convidado } from "../../entities/convidado";
import { Presenca } from "../../entities/presenca";

export interface CadastrarConvidadoPort {
  execute({
    name,
    email,
    presenca,
    qrCode,
  }: {
    name: string;
    email: string;
    presenca:  Presenca[];
    qrCode:string,
  }): Promise<Convidado>;
}
