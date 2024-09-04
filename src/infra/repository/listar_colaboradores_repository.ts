import { PrismaClient } from "@prisma/client";
import { BuscarListaConvidadosRepositoryPort } from "../../core/ports/out/repository/listar_convidados_repository_port";
import { Convidado } from "../../core/entities/convidado";

export class BuscarListaConvidadosRepository implements  BuscarListaConvidadosRepositoryPort{
  private prisma = new PrismaClient();

  async findAllColaboradores(): Promise<Convidado[]> {
    const colaboradoresData = await this.prisma.convidado.findMany();

    if (!colaboradoresData || colaboradoresData.length === 0) {
      throw new Error ('Nao ha colaborares na tua Lista');
    }

    const colaboradores = colaboradoresData.map((data) => {
      return new Convidado({
        id: data.id,
        name: data.name,
        email: data.email,
        presenca: [],
        qrCode: data.qrCode,
      });
    });

    return colaboradores;
  }
}
