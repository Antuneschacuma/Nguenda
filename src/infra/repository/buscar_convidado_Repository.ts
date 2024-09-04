import { PrismaClient } from "@prisma/client";
import { BuscarConvidadoRepositoryPort } from "../../core/ports/out/repository/buscar_convidado_repository_port";
import { Convidado } from "../../core/entities/convidado";
const prisma = new PrismaClient();

export class BuscarConvidoRepository implements BuscarConvidadoRepositoryPort {
  async findByCodigo({ codigo }: { codigo: string }): Promise<Convidado> {
    const convidadoEncontrado = await prisma.convidado.findUnique({
      where: {
        qrCode: codigo,
      },
      include: {
        presenca: true,
      },
    });
    if (!convidadoEncontrado) {
      throw new Error('Convidado não encontrado...');
    }
  
    const convidado = new Convidado({
      id: convidadoEncontrado.id,
      name: convidadoEncontrado.name,
      email: convidadoEncontrado.email,
      presenca: [],
      qrCode: convidadoEncontrado.qrCode,
    });
  
    return convidado;
  }
}
