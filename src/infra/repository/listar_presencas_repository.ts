import { PrismaClient } from "@prisma/client";
import { BuscarListaPresencaRepositoryPort } from "../../core/ports/out/repository/listar_presencas_repository_port";
import { Presenca } from "../../core/entities/presenca";
import { Convidado } from "../../core/entities/convidado";

export class BuscarListaPresencaRepository implements BuscarListaPresencaRepositoryPort {
  private prisma = new PrismaClient();

  async findAllPresencas({startDate,endDate}:{startDate?: Date, endDate?: Date}): Promise<Presenca[]> {
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    const presencasData = await this.prisma.presenca.findMany({
      where: {
        entrada: {
          gte: start,
          lte: end,
        },
      },
      include: {
        convidado: true,
      },
    });
    if (!presencasData || presencasData.length === 0) {
      throw new Error('Registo de presencas Vazio')
    }
    const presencas = presencasData.map((data) => {
      const convidado = new Convidado({
        id:data.convidado.id,
        name: data.convidado.name,
        email: data.convidado.email,
        presenca: [],
        qrCode: data.convidado.qrCode,
      });

      return new Presenca({
        id:data.id,
        convidado,
        entrada: data.entrada,
        saida:data.saida || undefined
      });
    });

    return presencas;
  }
}
