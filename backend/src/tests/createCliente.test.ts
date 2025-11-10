// createCliente.test.ts
import { Request, Response } from "express";
import { controller } from '../controllers/cliente.controller'; 
import { getUserFromToken } from "../services/user.services";
import clienteRepository from "../repositories/cliente.repository";

jest.mock("../services/user.services");
jest.mock("../repositories/cliente.repository");

describe("createCliente controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

  beforeEach(() => {
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn();
    req = {
      headers: {},
      body: {},
    };
    res = {
      status: statusMock,
      json: jsonMock,
    };
    jest.clearAllMocks();
  });

  it("debería retornar 401 si no hay usuario", async () => {
    (getUserFromToken as jest.Mock).mockReturnValue(null);

    await controller.createCliente(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(401);
    expect(jsonMock).toHaveBeenCalledWith({ message: "Usuario no autorizado" });
  });

  it("debería retornar 400 si no se envía clienteNombre", async () => {
    (getUserFromToken as jest.Mock).mockReturnValue({ usuarioId: 1 });

    req.body = { clienteEmail: "test@mail.com" };

    await controller.createCliente(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({ message: "El nombre es requerido" });
  });

  it("debería retornar 400 si ya existe un cliente con ese nombre", async () => {
    (getUserFromToken as jest.Mock).mockReturnValue({ usuarioId: 1 });
    (clienteRepository.getClienteByName as jest.Mock).mockResolvedValue({ clienteNombre: "Juan" });

    req.body = { clienteNombre: "Juan" };

    await controller.createCliente(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({ message: "Ya existe un cliente con ese nombre" });
  });

  it("debería crear un cliente y retornar 201", async () => {
    (getUserFromToken as jest.Mock).mockReturnValue({ usuarioId: 1 });
    (clienteRepository.getClienteByName as jest.Mock).mockResolvedValue(null);
    (clienteRepository.createCliente as jest.Mock).mockResolvedValue({
      clienteId: 123,
      clienteNombre: "Juan",
    });

    req.body = { clienteNombre: "Juan", clienteEmail: "test@mail.com" };

    await controller.createCliente(req as Request, res as Response);

    expect(clienteRepository.createCliente).toHaveBeenCalledWith(
      1,
      "Juan",
      "test@mail.com",
      undefined,
      undefined,
      undefined,
      undefined
    );
    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith({ clienteId: 123, clienteNombre: "Juan" });
  });

  it("debería retornar 500 si ocurre un error", async () => {
    (getUserFromToken as jest.Mock).mockReturnValue({ usuarioId: 1 });
    (clienteRepository.getClienteByName as jest.Mock).mockRejectedValue(new Error("DB error"));

    req.body = { clienteNombre: "Juan" };

    await controller.createCliente(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ message: "Error al crear cliente" });
  });
});
