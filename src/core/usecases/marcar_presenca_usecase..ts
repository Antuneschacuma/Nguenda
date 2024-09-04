
import { Presenca } from "../entities/presenca";
import { TipoAcao } from "../entities/tipo_acao";
import { MarcarPresencaPort } from "../ports/in/marcar_presenca_port";
import { MarcarPresencaRepositoryPort } from "../ports/out/repository/marcar_presenca_repository_port";
import { BuscarConvidado } from "./buscar_convidado_usecase";
import { BuscarPresenca } from "./buscar_presenca_usecase";

export class MarcarPresenca implements MarcarPresencaPort {
  constructor(
    private marcarPresencaRepositoryPort: MarcarPresencaRepositoryPort,
    private buscarPresenca: BuscarPresenca,
    private buscarConvidado: BuscarConvidado,
  ) {}

  async execute({ codigoConvidado, tipoAcao }: { codigoConvidado: string; tipoAcao: TipoAcao }): Promise<Presenca> {
    const convidado = await this.buscarConvidado.execute({ codigo: codigoConvidado });
    const presencaExistente = await this.buscarPresenca.execute({ convidadoId: convidado.getId() });
    const agora = new Date();

    switch (tipoAcao) {
      case TipoAcao.ENTRADA:
        if (presencaExistente && !presencaExistente.getSaida()) {
          throw new Error("Ja existe uma entrada registrada.");
        }
        const novaPresenca = new Presenca({ id: "", convidado, entrada: agora });
        novaPresenca.validateEntrada();
        return await this.marcarPresencaRepositoryPort.save({ presenca: novaPresenca });

      case TipoAcao.SAIDA:
        if (!presencaExistente || presencaExistente.getSaida()) {
          throw new Error("Não há uma entrada sem saída registrada.");
        }
        presencaExistente.setSaida(agora);
        presencaExistente.validateSaida();
        return await this.marcarPresencaRepositoryPort.save({ presenca: presencaExistente });

      case TipoAcao.CONSULTAR:
        if (!presencaExistente) {
          throw new Error("Ainda nao há registros de presença.");
        }
        return presencaExistente;

      default:
        throw new Error("Ação inválida.");
    }
  }
}

