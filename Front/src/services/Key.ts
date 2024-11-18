import { toDateOrNull } from '../helpers/toDateOrNull';
import { Key } from '../types';
import { axiosClient, getAuthorizationHeaders } from './BaseApi';

export interface KeyModel {
  id: number;
  name: string;
  bloco: string;
  piso: string;
  numero: string;
  is_avaible: boolean;
  createdAt: string;
  updatedAt: string;
}

export const keyToKeyModel = (response: Key): KeyModel => ({
  ...response,
  is_avaible: response.is_avaible === 1,
  createdAt: toDateOrNull(response.created_at)!,
  updatedAt: toDateOrNull(response.updated_at)!,
});

export async function getAllKeys(): Promise<KeyModel[]> {
  try {
    const response = await axiosClient.get<Key[]>('/keys/all', { headers: getAuthorizationHeaders() });

    return response.data.map((key) => keyToKeyModel(key));
  } catch (error) {
    throw new Error('Error no Servidor. Tente Novamente');
  }
}
