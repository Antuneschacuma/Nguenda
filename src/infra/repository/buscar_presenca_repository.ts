import { PrismaClient } from "@prisma/client";
import { BuscarPresencaRepositoryPort } from "../../core/ports/out/repository";
import { Presenca, Colaborador } from "../../core/entities";

export class BuscarPresencaRepository implements BuscarPresencaRepositoryPort {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  async findByColaboradorId({ colaboradorId }: { colaboradorId: string }): Promise<Presenca| null > {
    const presencaEncontrada = await this.prisma.presenca.findFirst({
      where: {
        colaboradorId,
      },
      orderBy: {
        entrada: 'desc',
      },
      include: { colaborador: true },
    });
  
    if (!presencaEncontrada) {
      return null;
    }
  
    const colaborador = new Colaborador({
      id: presencaEncontrada.colaboradorId,
      name: presencaEncontrada.colaborador.name,
      email: presencaEncontrada.colaborador.email,
      telefone: presencaEncontrada.colaborador.telefone,
      presenca: [],
      qrCode: presencaEncontrada.colaborador.qrCode,
    });
  
    const presenca = new Presenca({
      id: presencaEncontrada.id,
      colaborador: colaborador,
      entrada: presencaEncontrada.entrada,
      saida: presencaEncontrada.saida || undefined,
    });
  
    return presenca;
  }
  
}
