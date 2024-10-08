import axios, { AxiosResponse } from 'axios';

class UserService {
  path: string;

  constructor(path: string) {
    this.path = path;
  }

  login(name: string, password: string): Promise<AxiosResponse<string, any>> {
    console.log('username:', name);
    return axios.post<string>(`http://localhost:3000${this.path}/login`, {
      name,
      password,
    });
  }
}

export default new UserService('/api/usuarios');
