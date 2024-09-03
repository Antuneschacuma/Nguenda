import { Application, Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { CadastrarColaboradorController } from '../adapters/in/controllers/criar-colaborador-controller';
import { CadastrarColaborador } from '../core/usecases';
import { CadastrarColaboradorRepository } from '../infra/repository';
import { CriarColaboradorDTO } from '../dtos/criar-colaborador-dto';
import { ErrorHandler } from '../exceptions/ErrorHandler';

export class ColaboradorRoute {
  private cadastrarColaboradorController: CadastrarColaboradorController;

  constructor() {
    const cadastrarColaboradorRepository = new CadastrarColaboradorRepository();
    const cadastrarColaborador = new CadastrarColaborador(cadastrarColaboradorRepository);
    this.cadastrarColaboradorController = new CadastrarColaboradorController(cadastrarColaborador);
  }

  public registerRoutes(app: Application) {
    app.post('/api/v1/colaborador', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const dto = plainToClass(CriarColaboradorDTO, req.body);
        await validateOrReject(dto);

        const result = await this.cadastrarColaboradorController.criar(dto);
        res.status(201).send(result);
      } catch (error: any) {
        ErrorHandler.handle(error, res);
      }
    });
  }
}
