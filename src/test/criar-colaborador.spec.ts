import { describe, expect, it } from "vitest";

import { CadastrarColaboradorController } from "../adapters/in/controllers/criar-colaborador-controller";
import { Presenca } from "../core/entities";
import { CadastrarColaborador } from "../core/usecases/cadastrar_convidado_usecase";
import { CadastrarColaboradorRepository } from "../infra/repository/cadastrar_colaborador_repository";

const sut = ({
  name,
  email,
  telefone,
  presenca,
  qrCode,
}: {
  name: string;
  email: string;
  telefone: string;
  presenca: Presenca[];
  qrCode: string;
}): Promise<string> => {
  return new CadastrarColaboradorController(
    new CadastrarColaborador(new CadastrarColaboradorRepository())
  ).criar({ name, email, telefone, presenca, qrCode });
};

describe("Criar Colaborador", () => {
  it("deve lançar exceção se o Nome estiver incorreto", () => {
    const promise = sut({
      name: "",
      email: "chacuma@gmail.com",
      telefone: "941717851",
      presenca: [],
      qrCode: "xxxxxxxx",
    });
    expect(promise).rejects.toThrowError("Nome inválido.");
  });

  it("deve lançar exceção se o Email estiver incorreto", () => {
    const promise = sut({
      name: "Antunes",
      email: "",
      telefone: "941717851",
      presenca: [],
      qrCode: "xxxxxxxx",
    });
    expect(promise).rejects.toThrowError("Email inválido.");
  });

  it("deve lançar exceção se o Telefone estiver incorreto", () => {
    const promise = sut({
      name: "Antunes",
      email: "chacuma@gmail.com",
      telefone: "",
      presenca: [],
      qrCode: "xxxxxxxx",
    });
    expect(promise).rejects.toThrowError("Telefone inválido.");
  });

  it("deve lançar exceção se nao for Um Array De Presencas", () => {
    const promise = sut({
      name: "Antunes",
      email: "chacuma@gmail.com",
      telefone: "941717851",
      presenca: [],
      qrCode: "xxxxxxxx",
    });
    expect(promise).rejects.toThrowError("Registo de presença inválido.");
  });

  it("deve lançar exceção se o qrCode estiver incorreto", () => {
    const promise = sut({
      name: "Antunes",
      email: "chacuma@gmail.com",
      telefone: "941717851",
      presenca: [],
      qrCode: "",
    });
    expect(promise).rejects.toThrowError("QR code inválido.");
  });

  // it("Deve Criar um Colaborador com Todos Os campos Preenchidos", async () => {
  //   const message = await sut({
  //     name: "Antunes",
  //     email: "chacuma@gmail.com",
  //     telefone: "941717851",
  //     registoPresenca: [],
  //     qrCode: "xxxxxxxx",
  //   });
  //   expect(message).toEqual("Colaborador criado com sucesso");
  // });
});
