import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import NuevoCliente from "./NuevoCliente";
import ClienteService from "../../services/ClienteService";
import NotificationService from "../../utils/NotificationService";

vi.mock("../../services/ClienteService", () => ({
  default: {
    createCliente: vi.fn(),
  },
}));

vi.mock("../../utils/NotificationService", () => ({
  default: {
    error: vi.fn(),
    info: vi.fn(),
  },
}));

describe("NuevoCliente", () => {
  const onClose = vi.fn();
  const onClienteCreado = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const fillForm = () => {
    fireEvent.change(screen.getByLabelText(/Nombre/i), {
      target: { value: "Juan Pérez", name: "nombre" },
    });
  };

  it("renderiza correctamente el diálogo cuando open=true", () => {
    render(
      <NuevoCliente open={true} onClose={onClose} onClienteCreado={onClienteCreado} />
    );
    expect(screen.getByText(/Crear Nuevo Cliente/i)).toBeInTheDocument();
  });

  it("no permite enviar si el nombre está vacío", async () => {
    render(
      <NuevoCliente open={true} onClose={onClose} onClienteCreado={onClienteCreado} />
    );

    fireEvent.change(screen.getByLabelText(/Nombre/i), {
      target: { value: "", name: "nombre" },
    });

    fireEvent.click(screen.getByText(/Guardar Cliente/i));

    await waitFor(() => {
      expect(ClienteService.createCliente).not.toHaveBeenCalled();
      expect(NotificationService.error).toHaveBeenCalled();
    });
  });

  it("muestra éxito si la API responde correctamente", async () => {
    (ClienteService.createCliente as any).mockResolvedValue({});

    render(
      <NuevoCliente open={true} onClose={onClose} onClienteCreado={onClienteCreado} />
    );

    fillForm();
    fireEvent.click(screen.getByText(/Guardar Cliente/i));

    await waitFor(() => {
      expect(NotificationService.info).toHaveBeenCalledWith("Cliente creado con éxito");
      expect(onClienteCreado).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
      expect(screen.getByText(/Cliente creado con éxito/i)).toBeInTheDocument();
    });
  });

  it("muestra error 400 si la API devuelve mensaje de error", async () => {
    (ClienteService.createCliente as any).mockRejectedValue({
      response: { status: 400, data: { message: "El cliente ya existe" } },
    });

    render(
      <NuevoCliente open={true} onClose={onClose} onClienteCreado={onClienteCreado} />
    );

    fillForm();
    fireEvent.click(screen.getByText(/Guardar Cliente/i));

    await waitFor(() => {
      expect(NotificationService.error).toHaveBeenCalledWith("El cliente ya existe");
      expect(screen.getByText(/El cliente ya existe/i)).toBeInTheDocument();
    });
  });

  it("muestra error genérico si la API devuelve otro status", async () => {
    (ClienteService.createCliente as any).mockRejectedValue({
      response: { status: 500, data: {} },
    });

    render(
      <NuevoCliente open={true} onClose={onClose} onClienteCreado={onClienteCreado} />
    );

    fillForm();
    fireEvent.click(screen.getByText(/Guardar Cliente/i));

    await waitFor(() => {
      expect(NotificationService.error).toHaveBeenCalledWith("Error al crear cliente");
      expect(screen.getByText(/Error al crear cliente/i)).toBeInTheDocument();
    });
  });

  it("muestra error si ocurre un fallo de red", async () => {
    (ClienteService.createCliente as any).mockRejectedValue(
      new Error("Network Error")
    );

    render(
      <NuevoCliente open={true} onClose={onClose} onClienteCreado={onClienteCreado} />
    );

    fillForm();
    fireEvent.click(screen.getByText(/Guardar Cliente/i));

    await waitFor(() => {
      expect(NotificationService.error).toHaveBeenCalledWith(
        "No se pudo conectar con el servidor"
      );
      expect(
        screen.getByText(/No se pudo conectar con el servidor/i)
      ).toBeInTheDocument();
    });
  });
});
