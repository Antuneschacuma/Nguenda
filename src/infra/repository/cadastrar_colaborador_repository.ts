import { PrismaClient, Prisma } from "@prisma/client";
import { DuplicateEntryError } from "../../exceptions/DuplicateError";
import { Convidado } from "../../core/entities/convidado";
import { CadastrarConvidadoRepositoryPort } from "../../core/ports/out/repository/cadastrar_convidado_repository_port";

export class CadastrarConvidadoRepository
  implements CadastrarConvidadoRepositoryPort
{
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async save(convidado: Convidado): Promise<Convidado> {
    try {
      const createdColaborador = await this.prisma.convidado.create({
        data: {
          name: convidado.getName(),
          email: convidado.getEmail(),
          qrCode: convidado.getQrCode(),
        },
      });

      return new Convidado({
        id: createdColaborador.id,
        name: createdColaborador.name,
        email: createdColaborador.email,
        presenca: [],
        qrCode: createdColaborador.qrCode,
      });

    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          const target = error.meta?.target as string[] | undefined;
          if (target) {
            throw new DuplicateEntryError(target);
          }
        }
      }
      throw error;
    }
  }
}
