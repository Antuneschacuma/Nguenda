import express, { Application, Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { ColaboradorRoute } from './aplication/criar-colaborador-route';
import { MarcarPresencaRoute } from './aplication/marcar-presenca-route';
import { BuscarListapresencaRoute } from './aplication/listar-presencas-route';
import { BuscarListaColaboradoresRoute } from './aplication/listar-colaboradores';
import { PresencasColaboradorRoute } from './aplication/presencas-colaborador-route';
import { BuscarColaboradorRoute } from './aplication/buscar-colabordor-route';
import { ErrorHandler } from './exceptions/ErrorHandler';

const app: Application = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

const swaggerDocument = YAML.load('documentacao/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const colaboradorRoute = new ColaboradorRoute();
const marcarPresencaRoute = new MarcarPresencaRoute();
const buscarColaborador = new BuscarColaboradorRoute();
const buscarListaPresencas = new BuscarListapresencaRoute();
const presencasColaborador = new PresencasColaboradorRoute();
const buscarListaColaboradores = new BuscarListaColaboradoresRoute();

colaboradorRoute.registerRoutes(app);
buscarColaborador.registerRoutes(app);
marcarPresencaRoute.registerRoutes(app);
presencasColaborador.registerRoutes(app);
buscarListaPresencas.registerRoutes(app);
buscarListaColaboradores.registerRoutes(app);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  ErrorHandler.handle(err, res);
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
