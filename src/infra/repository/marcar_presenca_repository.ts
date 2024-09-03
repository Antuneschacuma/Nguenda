import { PrismaClient } from "@prisma/client";
import { MarcarPresencaRepositoryPort } from "../../core/ports/out/repository";
import { Presenca } from "../../core/entities";

export class MarcarPresencaRepository implements MarcarPresencaRepositoryPort {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async save({ presenca }: { presenca: Presenca }): Promise<Presenca> {
    const colaborador = presenca.getColaborador();
    const colaboradorId = colaborador.getId();

    let presencaSalva;

    if (presenca.getId()) {
      presencaSalva= await this.prisma.presenca.update({
        where: { id: presenca.getId() },
        data: {
          saida: presenca.getSaida(),
        },
      });
    } else {
      presencaSalva = await this.prisma.presenca.create({
        data: {
          entrada: presenca.getEntrada(),
          saida: presenca.getSaida(),
          colaboradorId: colaboradorId,
        },
      });
    }
    
    return new Presenca({
      id: presencaSalva.id,
      entrada: presencaSalva.entrada,
      saida: presencaSalva.saida || undefined,
      colaborador: colaborador,
    });
  }
}
