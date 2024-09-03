import { Colaborador, Presenca } from "../../core/entities";
import { PrismaClient } from "@prisma/client";
import { BuscarListaPresencaRepositoryPort } from "../../core/ports/out/repository";

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
        colaborador: true,
      },
    });
    if (!presencasData || presencasData.length === 0) {
      throw new Error('Registo de presencas Vazio')
    }
    const presencas = presencasData.map((data) => {
      const colaborador = new Colaborador({
        id:data.colaborador.id,
        name: data.colaborador.name,
        email: data.colaborador.email,
        telefone: data.colaborador.telefone,
        presenca: [],
        qrCode: data.colaborador.qrCode,
      });

      return new Presenca({
        id:data.id,
        colaborador,
        entrada: data.entrada,
        saida:data.saida || undefined
      });
    });

    return presencas;
  }
}
