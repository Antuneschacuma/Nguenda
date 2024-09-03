import { Colaborador } from "../../entities";
import { Presenca } from "../../entities/presenca";

export interface CadastrarColaboradorPort {
  execute({
    name,
    email,
    telefone,
    presenca,
    qrCode,
  }: {
    name: string;
    email: string;
    telefone: string;
    presenca:  Presenca[];
    qrCode:string,
  }): Promise<Colaborador>;
}
