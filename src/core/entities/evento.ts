import { Entity } from "./entity";
import { Convidado } from "./convidado";
import { Presenca } from "./presenca";

type EventoData = {
  id: string;
  nome: string;
  data: Date;
  local: string;
  capacidade: number;
  convidados?: Convidado[];
  presencas?: Presenca[];
};

export class Evento extends Entity {
  private nome: string;
  private data: Date;
  private local: string;
  private capacidade: number;
  private convidados: Convidado[];
  private presencas: Presenca[];

  constructor({ id, nome, data, local, capacidade, convidados, presencas }: EventoData) {
    super(id);
    this.nome = nome;
    this.data = data;
    this.local = local;
    this.capacidade = capacidade;
    this.convidados = convidados || [];
    this.presencas = presencas || [];
    this.validate(); // Chama a validação no construtor para garantir que o evento é válido ao ser criado
  }

  // Getters
  public getNome(): string {
    return this.nome;
  }

  public getData(): Date {
    return this.data;
  }

  public getLocal(): string {
    return this.local;
  }

  public getCapacidade(): number {
    return this.capacidade;
  }

  public getConvidados(): Convidado[] {
    return this.convidados;
  }

  public getPresencas(): Presenca[] {
    return this.presencas;
  }

  public validate(): void {
    if (!this.nome || this.nome.trim() === "") {
      throw new Error("Nome do evento inválido.");
    }
    if (!this.data || isNaN(this.data.getTime())) {
      throw new Error("Data do evento inválida.");
    }
    if (!this.local || this.local.trim() === "") {
      throw new Error("Local do evento inválido.");
    }
    if (typeof this.capacidade !== "number" || this.capacidade <= 0) {
      throw new Error("Capacidade do evento deve ser um número positivo.");
    }
    if (!Array.isArray(this.convidados)) {
      throw new Error("Lista de convidados inválida.");
    }
    if (!Array.isArray(this.presencas)) {
      throw new Error("Lista de presenças inválida.");
    }
    if (this.convidados.length > this.capacidade) {
      throw new Error("Número de convidados excede a capacidade do evento.");
    }
  }
}
