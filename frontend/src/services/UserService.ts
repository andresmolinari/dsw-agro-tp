import axios, { AxiosResponse } from 'axios';

interface LoginResponse {
  token: string;
}

class UserService {
  path: string;

  constructor(path: string) {
    this.path = path;
  }

  login(name: string, password: string): Promise<AxiosResponse<LoginResponse>> {
    console.log('username:', name);
    return axios.post<LoginResponse>(
      `http://localhost:3000${this.path}/login`,
      {
        name,
        password,
      }
    );
  }
}

export default new UserService('/api/usuarios');
