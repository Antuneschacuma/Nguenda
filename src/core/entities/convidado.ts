import { Entity } from "./entity";
import { Presenca } from "./presenca";

type ConvidadoData = {
  id: string;
  name: string;
  email: string;
  presenca: Presenca[];
  qrCode: string;
};

export class Convidado extends Entity {
  private name: string;
  private email: string;
  private presenca: Presenca[];
  private qrCode: string;

  constructor({ id, name, email,presenca, qrCode }: ConvidadoData) {
    super(id);
    this.name = name;
    this.email = email;
    this.presenca = presenca || [];
    this.qrCode = qrCode;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPresenca(): Presenca[] {
    return this.presenca;
  }

  public getQrCode(): string {
    return this.qrCode;
  }

  public validate(): void {
    if (!this.name || this.name.trim() === "") {
      throw new Error("Nome inválido.");
    }
    if (!this.email || this.email.trim() === "") {
      throw new Error("Email inválido.");
    }
    if (!this.qrCode || this.qrCode.trim() === "") {
      throw new Error("QR code inválido.");
    }
    
  }
}
