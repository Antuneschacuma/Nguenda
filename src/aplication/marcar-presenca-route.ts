import { Application, Request, Response, NextFunction } from 'express';
import { MarcarPresencaController } from '../adapters/in/controllers/marcar_presenca_controller';
import { BuscarPresenca } from '../core/usecases/buscar_presenca_usecase';
import { plainToClass } from 'class-transformer';
import { MarcarPresencaDTO } from '../dtos/marcar-presenca-dto';
import { ErrorHandler } from '../exceptions/ErrorHandler';
import { validateOrReject } from 'class-validator';
import { MarcarPresencaRepository } from '../infra/repository/marcar_presenca_repository';
import { BuscarConvidado } from '../core/usecases/buscar_convidado_usecase';
import { BuscarConvidoRepository } from '../infra/repository/buscar_convidado_Repository';
import { BuscarPresencaRepository } from '../infra/repository/buscar_presenca_repository';
import { MarcarPresenca } from '../core/usecases/marcar_presenca_usecase.';

export class MarcarPresencaRoute {
  private marcarPresencaController: MarcarPresencaController;

  constructor() {
    const marcarPresencaRepository = new MarcarPresencaRepository();
    const buscarConvidadoRepository = new BuscarConvidoRepository ();
    const buscarConvidado = new BuscarConvidado(buscarConvidadoRepository);
    const buscarPresencaRepository = new BuscarPresencaRepository();
    const buscarPresenca = new BuscarPresenca(buscarPresencaRepository);

    const marcarPresenca = new MarcarPresenca(
      marcarPresencaRepository,
      buscarPresenca,
      buscarConvidado
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
