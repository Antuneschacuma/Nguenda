import { Application, Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { ErrorHandler } from '../exceptions/ErrorHandler';
import { BuscarColaboradorDto } from '../dtos/buscar_colaborador_dto';
import { BuscarConvidoRepository } from '../infra/repository/buscar_convidado_Repository';
import { BuscarConvidado } from '../core/usecases/buscar_convidado_usecase';
import { BuscarConvidadoController } from '../adapters/in/controllers/buscar_convidado_controllers';
export class BuscarColaboradorRoute {
  private buscarConvidadoController: BuscarConvidadoController;

  constructor() {
    const buscarConvidadoRepository = new BuscarConvidoRepository();
    const buscarConvidado = new BuscarConvidado(buscarConvidadoRepository);
    this.buscarConvidadoController = new BuscarConvidadoController(buscarConvidado);
  }

  public registerRoutes(app: Application) {
    app.get('/api/v1/colaboradores/:codigo', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const params = plainToClass(BuscarColaboradorDto, req.params);
        await validateOrReject(params);

        const result = await this.buscarConvidadoController.buscar(params);
        res.status(200).send(result);
      } catch (error: any) {
        ErrorHandler.handle(error, res);
      }
    });
  }
}
