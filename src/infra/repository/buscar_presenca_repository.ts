import { PrismaClient } from "@prisma/client";
import { BuscarPresencaRepositoryPort } from "../../core/ports/out/repository/buscar_presenca_repository_port";
import { Presenca } from "../../core/entities/presenca";
import { Convidado } from "../../core/entities/convidado";

export class BuscarPresencaRepository implements BuscarPresencaRepositoryPort {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  async findByColaboradorId({ convidadoId }: { convidadoId: string }): Promise<Presenca| null > {
    const presencaEncontrada = await this.prisma.presenca.findFirst({
      where: {
        convidadoId,
      },
      orderBy: {
        entrada: 'desc',
      },
      include: { convidado: true },
    });
  
    if (!presencaEncontrada) {
      return null;
    }
  
    const convidado = new Convidado({
      id: presencaEncontrada.convidadoId,
      name: presencaEncontrada.convidado.name,
      email: presencaEncontrada.convidado.email,
      presenca: [],
      qrCode: presencaEncontrada.convidado.qrCode,
    });
  
    const presenca = new Presenca({
      id: presencaEncontrada.id,
      convidado: convidado,
      entrada: presencaEncontrada.entrada,
      saida: presencaEncontrada.saida || undefined,
    });
  
    return presenca;
  }
  
}
