import { Application, Request, Response, NextFunction } from 'express';
import { BuscarListaPresencaController } from '../adapters/in/controllers/listar_presencas_controller';
import { BuscarListaPresenca } from '../core/usecases/listar_presencas_usecase';
import { BuscarListaPresencaRepository } from '../infra/repository/listar_presencas_repository';
import { ErrorHandler } from '../exceptions/ErrorHandler';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { BuscarPresencaDTO } from '../dtos/buscar_presencas_dto';

export class BuscarListapresencaRoute {
  private buscarListaPresencaController: BuscarListaPresencaController;

  constructor() {
    const buscarListaPresencaRepository = new BuscarListaPresencaRepository();
    const buscarListaPresenca = new BuscarListaPresenca(buscarListaPresencaRepository);
    this.buscarListaPresencaController = new BuscarListaPresencaController(buscarListaPresenca);
  }

  public registerRoutes(app: Application) {
    app.get('/api/v1/presencas', async (req: Request, res: Response, next: NextFunction) => {
      try {

        const data = plainToClass(BuscarPresencaDTO, req.query);
        await validateOrReject(data);

        const result = await this.buscarListaPresencaController.listar(data);
        res.status(200).send(result);
      } catch (error: any) {
        ErrorHandler.handle(error, res);
      }
    });
  }
}
