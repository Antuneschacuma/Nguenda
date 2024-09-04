import { Application, Request, Response, NextFunction } from 'express';
import { BuscarListaConvidadosController } from '../adapters/in/controllers/listar_convidados_-controller';
import { ErrorHandler } from '../exceptions/ErrorHandler';
import { BuscarListaConvidadosRepository } from '../infra/repository/listar_colaboradores_repository';
import { BuscarListaConvidados } from '../core/usecases/listar_convidados_usecase';

export class BuscarListaColaboradoresRoute {
  private buscarListaConvidadosController: BuscarListaConvidadosController;

  constructor() {
    const buscarListaConvidadosRepository = new BuscarListaConvidadosRepository();
    const buscarListaConvidados = new BuscarListaConvidados(buscarListaConvidadosRepository);
    this.buscarListaConvidadosController = new BuscarListaConvidadosController(buscarListaConvidados);
  }

  public registerRoutes(app: Application) {
    app.get('/api/v1/colaboradores', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await this.buscarListaConvidadosController.listar();
        res.status(200).send(result);
      } catch (error: any) {
        ErrorHandler.handle(error, res);
      }
    });
  }
}
