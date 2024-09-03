import { Application, Request, Response, NextFunction } from 'express';
import { BuscarListaColaboradoresController } from '../adapters/in/controllers/listar-colaboradores-controller';
import { BuscarListaColaboradores } from '../core/usecases/listar_convidados_usecase';
import { BuscarListaColaboradoresRepository } from '../infra/repository/listar_colaboradores_repository';
import { ErrorHandler } from '../exceptions/ErrorHandler';

export class BuscarListaColaboradoresRoute {
  private buscarListaColaboradoresController: BuscarListaColaboradoresController;

  constructor() {
    const buscarListaColaboradoresRepository = new BuscarListaColaboradoresRepository();
    const buscarListaColaboradores = new BuscarListaColaboradores(buscarListaColaboradoresRepository);
    this.buscarListaColaboradoresController = new BuscarListaColaboradoresController(buscarListaColaboradores);
  }

  public registerRoutes(app: Application) {
    app.get('/api/v1/colaboradores', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await this.buscarListaColaboradoresController.listar();
        res.status(200).send(result);
      } catch (error: any) {
        ErrorHandler.handle(error, res);
      }
    });
  }
}
