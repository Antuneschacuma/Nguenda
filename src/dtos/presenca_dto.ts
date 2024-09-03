export class PresencaDTO {
    constructor(
      public id: string,
      public nome: string,
      public entrada: Date,
      public saida: Date | null,
    ) {}
  }
  