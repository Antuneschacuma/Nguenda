import { Entity } from "./entity";
import { Presenca } from "./presenca";

type UserData = {
  id: string;
  name: string;
  email: string;
  telefone: string;
  presenca: Presenca[];
  qrCode: string;
};

export class User extends Entity {
  private name: string;
  private email: string;
  private telefone: string;
  private presenca: Presenca[];
  private qrCode: string;

  constructor({ id, name, email, telefone, presenca, qrCode }: UserData) {
    super(id);
    this.name = name;
    this.email = email;
    this.telefone = telefone;
    this.presenca = presenca || [];
    this.qrCode = qrCode;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getTelefone(): string {
    return this.telefone;
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
    if (!this.telefone || this.telefone.trim() === "") {
      throw new Error("Telefone inválido.");
    }
    if (!this.qrCode || this.qrCode.trim() === "") {
      throw new Error("QR code inválido.");
    }
    if (!Array.isArray(this.presenca)) {
      throw new Error("Registro de presença inválido.");
    }
  }
}
