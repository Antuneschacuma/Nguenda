import { Application, Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { CriarColaboradorDTO } from '../dtos/criar-colaborador-dto';
import { ErrorHandler } from '../exceptions/ErrorHandler';
import { CadastrarConvidadoController } from '../adapters/in/controllers/criar_convidado_controller';
import { CadastrarConvidadoRepository } from '../infra/repository/cadastrar_colaborador_repository';
import { CadastrarConvidado } from '../core/usecases/cadastrar_convidado_usecase';

export class ColaboradorRoute {
  private cadastrarConvidadoController: CadastrarConvidadoController;

  constructor() {
    const cadastrarConvidadoRepository = new CadastrarConvidadoRepository();
    const cadastrarConvidado = new CadastrarConvidado(cadastrarConvidadoRepository);
    this.cadastrarConvidadoController = new CadastrarConvidadoController(cadastrarConvidado);
  }

  public registerRoutes(app: Application) {
    app.post('/api/v1/colaborador', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const dto = plainToClass(CriarColaboradorDTO, req.body);
        await validateOrReject(dto);

        const result = await this.cadastrarConvidadoController.criar(dto);
        res.status(201).send(result);
      } catch (error: any) {
        ErrorHandler.handle(error, res);
      }
    });
  }
}
