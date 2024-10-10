import { User } from '../types';
import { axiosClient, getAuthorizationHeaders } from './BaseApi';

export async function getAllUsers(): Promise<User[]> {
  try {
    const response = await axiosClient.get<User[]>('/auth/users', { headers: getAuthorizationHeaders() });

    return response.data;
  } catch (error) {
    throw new Error('Error no Servidor. Tente Novamente');
  }
}

export interface IUserDTO {
  name: string
  email: string
  password: string
  password_confirmation: string
  level: string

}
export async function registerUser(user: IUserDTO) {
  try {
    const response = await axiosClient.post('/auth/register', user, { headers: getAuthorizationHeaders() });
    return response.data;
  } catch (error) {
    throw new Error('Error no Servidor. Tente Novamente');
  }
}