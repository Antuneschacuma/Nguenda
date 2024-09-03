// src/exceptions/ErrorHandler.ts

import { Response } from 'express';
import { ValidationError } from 'class-validator';
import { DuplicateEntryError } from './DuplicateError';

export class ErrorHandler {
  public static handle(error: any, res: Response) {
    if (Array.isArray(error) && error[0] instanceof ValidationError) {
      const formattedErrors = error.map((err: ValidationError) =>
        this.formatValidationError(err)
      );
      res.status(400).send({ errors: formattedErrors });
    } else if (error instanceof DuplicateEntryError) { 
      res.status(409).send({ error: error.message, fields: error.fields });
    } else if (error instanceof Error) {
      res.status(500).send({ error: error.message });
    } else {
      const errorMessage =
        error instanceof Error ? error.message : 'Erro desconhecido';
      res.status(500).send({ error: errorMessage });
    }
  }

  private static formatValidationError(error: ValidationError) {
    const constraints = Object.values(error.constraints || {}).join(', ');
    return `Erro: ${constraints}`;
  }
}
