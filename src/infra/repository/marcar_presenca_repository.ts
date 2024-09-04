import { PrismaClient } from "@prisma/client";
import { MarcarPresencaRepositoryPort } from "../../core/ports/out/repository/marcar_presenca_repository_port";
import { Presenca } from "../../core/entities/presenca";

export class MarcarPresencaRepository implements MarcarPresencaRepositoryPort {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async save({ presenca }: { presenca: Presenca }): Promise<Presenca> {
    const convidado = presenca.getConvidado();
    const convidadoId = convidado.getId();

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
          convidadoId: convidadoId,
        },
      });
    }
    
    return new Presenca({
      id: presencaSalva.id,
      entrada: presencaSalva.entrada,
      saida: presencaSalva.saida || undefined,
      convidado: convidado,
    });
  }
}
