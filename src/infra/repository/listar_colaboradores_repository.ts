import { PrismaClient } from "@prisma/client";
import { Colaborador } from "../../core/entities";
import { BuscarListaColaboradoresRepositoryPort } from "../../core/ports/out/repository/listar_convidados_repository_port";

export class BuscarListaColaboradoresRepository implements  BuscarListaColaboradoresRepositoryPort{
  private prisma = new PrismaClient();

  async findAllColaboradores(): Promise<Colaborador[]> {
    const colaboradoresData = await this.prisma.colaborador.findMany();

    if (!colaboradoresData || colaboradoresData.length === 0) {
      throw new Error ('Nao ha colaborares na tua Lista');
    }

    const colaboradores = colaboradoresData.map((data) => {
      return new Colaborador({
        id: data.id,
        name: data.name,
        email: data.email,
        telefone: data.telefone,
        presenca: [],
        qrCode: data.qrCode,
      });
    });

    return colaboradores;
  }
}
