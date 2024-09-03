import { PrismaClient } from "@prisma/client";
import { Colaborador } from "../../core/entities";
import { BuscarColaboradorRepositoryPort } from "../../core/ports/out/repository";

const prisma = new PrismaClient();

export class BuscarColaboradorRepository implements BuscarColaboradorRepositoryPort {
  async findByCodigo({ codigo }: { codigo: string }): Promise<Colaborador> {
    const colaboradorEncontrado = await prisma.colaborador.findUnique({
      where: {
        qrCode: codigo,
      },
      include: {
        presenca: true,
      },
    });
    if (!colaboradorEncontrado) {
      throw new Error('Colaborador não encontrado...');
    }
  
    const colaborador = new Colaborador({
      id: colaboradorEncontrado.id,
      name: colaboradorEncontrado.name,
      email: colaboradorEncontrado.email,
      telefone: colaboradorEncontrado.telefone,
      presenca: [],
      qrCode: colaboradorEncontrado.qrCode,
    });
  
    return colaborador;
  }
}
