import { Application, Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { BuscarColaboradorController } from '../adapters/in/controllers/buscar-colaboradores-controllers';
import { ErrorHandler } from '../exceptions/ErrorHandler';
import { BuscarColaboradorDto } from '../dtos/buscar_colaborador_dto';
import { BuscarColaboradorRepository } from '../infra/repository/buscar_convidado_Repository';
import { BuscarColaborador } from '../core/usecases/buscar_convidado_usecase';

export class BuscarColaboradorRoute {
  private buscarColaboradorController: BuscarColaboradorController;

  constructor() {
    const buscarColaboradorRepository = new BuscarColaboradorRepository();
    const buscarColaborador = new BuscarColaborador(buscarColaboradorRepository);
    this.buscarColaboradorController = new BuscarColaboradorController(buscarColaborador);
  }

  public registerRoutes(app: Application) {
    app.get('/api/v1/colaboradores/:codigo', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const params = plainToClass(BuscarColaboradorDto, req.params);
        await validateOrReject(params);

        const result = await this.buscarColaboradorController.buscar(params);
        res.status(200).send(result);
      } catch (error: any) {
        ErrorHandler.handle(error, res);
      }
    });
  }
}
