import { Application, Request, Response, NextFunction } from 'express';
import { PresencasColaboradorController } from '../adapters/in/controllers/presencas-colaboradore-controller';
import { BuscarPresencasColaborador } from '../core/usecases/presencas-colaborador-usecase';
import { PresencasColaboradorRepository } from '../infra/repository/presencas-colaborador-repository';
import { BuscarPrsencaPorIdDTO } from '../dtos/buscar_presencas_por_id_dto';
import { ErrorHandler } from '../exceptions/ErrorHandler';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';

export class PresencasColaboradorRoute {
  private presencasColaboradorController: PresencasColaboradorController;

  constructor() {
    const presencasColaboradorRepository = new PresencasColaboradorRepository();
    const presencasColaborador = new BuscarPresencasColaborador(presencasColaboradorRepository);
    this.presencasColaboradorController = new PresencasColaboradorController(presencasColaborador);
  }

  public registerRoutes(app: Application) {
    app.get('/api/v1/presencas/:id', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = plainToClass(BuscarPrsencaPorIdDTO, req.query);
        await validateOrReject(data);

        const result = await this.presencasColaboradorController.buscar(data);
        res.status(200).send(result);
      } catch (error: any) {
        ErrorHandler.handle(error, res);
      }
    });
  }
}
