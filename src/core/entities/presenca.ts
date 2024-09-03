import { Colaborador } from "./convidado";
import { Entity } from "./entity";

type presencaData = {
  id: string;
  entrada: Date;
  saida?: Date;
  colaborador: Colaborador;
};
export class Presenca extends Entity {
  private entrada: Date;
  private saida?: Date;
  private colaborador: Colaborador;

  constructor({
    id,
    colaborador,
    entrada,
    saida,
  }: presencaData) {
    super(id);
    this.colaborador = colaborador;
    this.entrada = entrada;
    this.saida = saida;
  }

  public getEntrada(): Date {
    return this.entrada;
  }

  public getSaida(): Date | undefined {
    return this.saida;
  }

  public getColaborador(): Colaborador {
    return this.colaborador;
  }

  public setEntrada(entrada: Date): void {
    this.entrada = entrada;
  }

  public setSaida(saida: Date): void {
    if (saida <= this.entrada) {
      throw new Error("A saída deve ser posterior à data de entrada.");
    }
    this.saida = saida;
  }

  public validateEntrada(): void {
    if (!(this.entrada instanceof Date) || isNaN(this.entrada.getTime())) {
      throw new Error("Data de entrada inválida.");
    }
  }

  public validateSaida(): void {
    if (this.saida && this.saida <= this.entrada) {
      throw new Error("A saída deve ser posterior à data de entrada.");
    }
  }
}
