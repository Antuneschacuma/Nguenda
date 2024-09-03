import { describe, expect, it } from "vitest";

import { CriarHorarioLaboralController } from "../adapters/in/controllers/criar-horario-laboral-controller";
import { CriarHorarioLaboralRepository } from "../infra/repository/criar-horario-laboral-repository";
import { CriarHorarioLaboral } from "../core/usecases/criar-horario-laboral-usecase";

const sut = ({
  horaRegular,
  horaExtra,
  active,
}: {
  horaRegular: number;
  horaExtra: number;
  active:boolean;
}): Promise<string> => {
  return new CriarHorarioLaboralController(
    new CriarHorarioLaboral(new CriarHorarioLaboralRepository())
  ).criar({ horaRegular, horaExtra,active });
};

describe('Criar Horario laboral',()=>{
     it("deve lançar exceção se a horaRegular estiver incorreto",()=>{
        const promise=sut({
            horaRegular:-1,
            horaExtra:2,
            active:true,
        })
        expect(promise).rejects.toThrowError("horaRegular deve ser um número positivo")
     })

     it("deve lançar exceção se a horaRegular estiver incorreto",()=>{
        const promise=sut({
            horaRegular:8,
            horaExtra:-2,
            active:true,
        })
        expect(promise).rejects.toThrowError("horaExtra deve ser um número positivo")
     })
})