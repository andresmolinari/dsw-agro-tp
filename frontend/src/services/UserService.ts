import axios, { AxiosResponse } from "axios";
import { Usuario } from "../types/Usuario";

class UserService {
  path: string;

  constructor(path: string) {
    this.path = path;
  }

  // 🔑 Obtener token
  private getAuthHeaders() {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  login(name: string, password: string): Promise<AxiosResponse<string>> {
    console.log("username:", name);
    return axios.post<string>(`http://localhost:3000${this.path}/login`, {
      name,
      password,
    });
  }

  fetchAllUsuarios(): Promise<AxiosResponse<Usuario[]>> {
    return axios.get<Usuario[]>(`http://localhost:3000${this.path}`, {
      headers: this.getAuthHeaders(),
    });
  }

  async deleteUsuario(usuarioId: number): Promise<void> {
    await axios.delete<void>(`http://localhost:3000${this.path}/${usuarioId}`, {
      headers: this.getAuthHeaders(),
    });
  }
}

export const fetchUsuario = async (usuarioId: number): Promise<Usuario> => {
  const response = await axios.get<Usuario>(
    `http://localhost:3000/api/usuarios/${usuarioId}`
  );
  return response.data;
};

export const updateUsuario = async (
  usuarioId: number,
  data: Partial<Usuario>
): Promise<Usuario> => {
  // Obtener el token de localStorage
  const token = localStorage.getItem("token");

  // Configurar los headers con el token
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // Realizar la solicitud PUT con el token en los headers
  const response = await axios.put<Usuario>(
    `http://localhost:3000/api/usuarios/${usuarioId}`,
    data,
    { headers }
  );
  return response.data;
};
export default new UserService("/api/usuarios");
