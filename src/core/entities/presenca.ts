import { Convidado } from "./convidado";
import { Entity } from "./entity";

type presencaData = {
  id: string;
  entrada: Date;
  saida?: Date;
  convidado: Convidado;
};
export class Presenca extends Entity {
 
  private entrada: Date;
  private saida?: Date;
  private convidado: Convidado;

  constructor({
    id,
    convidado,
    entrada,
    saida,
  }: presencaData) {
    super(id);
    this.convidado = convidado;
    this.entrada = entrada;
    this.saida = saida;
  }

  public getEntrada(): Date {
    return this.entrada;
  }

  public getSaida(): Date | undefined {
    return this.saida;
  }

  public getConvidado(): Convidado {
    return this.convidado;
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
