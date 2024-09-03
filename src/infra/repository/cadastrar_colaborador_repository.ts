import { CadastrarColaboradorRepositoryPort } from "../../core/ports/out/repository";
import { PrismaClient, Prisma } from "@prisma/client";
import { Colaborador } from "../../core/entities";
import { DuplicateEntryError } from "../../exceptions/DuplicateError";

export class CadastrarColaboradorRepository
  implements CadastrarColaboradorRepositoryPort
{
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async save(colaborador: Colaborador): Promise<Colaborador> {
    try {
      const createdColaborador = await this.prisma.colaborador.create({
        data: {
          name: colaborador.getName(),
          email: colaborador.getEmail(),
          telefone: colaborador.getTelefone(),
          qrCode: colaborador.getQrCode(),
        },
      });

      return new Colaborador({
        id: createdColaborador.id,
        name: createdColaborador.name,
        email: createdColaborador.email,
        telefone: createdColaborador.telefone,
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
