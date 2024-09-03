import { Application, Request, Response, NextFunction } from 'express';
import { MarcarPresencaController } from '../adapters/in/controllers/marcar-presenca-controller';
import { BuscarColaborador, MarcarPresenca } from '../core/usecases';
import {
  BuscarColaboradorRepository,
  BuscarPresencaRepository,
  MarcarPresencaRepository,
} from '../infra/repository';
import { BuscarPresenca } from '../core/usecases/buscar_presenca_usecase';
import { plainToClass } from 'class-transformer';
import { MarcarPresencaDTO } from '../dtos/marcar-presenca-dto';
import { ErrorHandler } from '../exceptions/ErrorHandler';
import { validateOrReject } from 'class-validator';

export class MarcarPresencaRoute {
  private marcarPresencaController: MarcarPresencaController;

  constructor() {
    const marcarPresencaRepository = new MarcarPresencaRepository();
    const buscarColaboradorRepository = new BuscarColaboradorRepository();
    const buscarColaborador = new BuscarColaborador(buscarColaboradorRepository);
    const buscarPresencaRepository = new BuscarPresencaRepository();
    const buscarPresenca = new BuscarPresenca(buscarPresencaRepository);

    const marcarPresenca = new MarcarPresenca(
      marcarPresencaRepository,
      buscarPresenca,
      buscarColaborador
    );
    this.marcarPresencaController = new MarcarPresencaController(marcarPresenca);
  }

  public registerRoutes(app: Application) {
    app.post('/api/v1/presenca', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const dto = plainToClass(MarcarPresencaDTO, req.body);
        await validateOrReject(dto);

        const result = await this.marcarPresencaController.criar(dto);
        res.status(201).send(result); 
      } catch (error: any) {
        ErrorHandler.handle(error, res); 
      }
    });
  }
}
