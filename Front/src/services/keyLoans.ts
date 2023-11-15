import { toDateOrNull } from '../helpers/toDateOrNull';
import { KeyLoan } from '../types';
import { axiosClient, getAuthorizationHeaders } from './BaseApi';
import { KeyModel, keyToKeyModel } from './Key';
export interface KeyLoanModel {
  id: number;
  user_id: number;
  key_id: number;
  key: KeyModel;
  reason: string;
  responsible_name: string;
  responsible_register: string;
  responsible_phone: string;
  createdAt: string;
  updatedAt: string;
}

const keyLoanToLoanModel = (response: KeyLoan): KeyLoanModel => ({
  ...response,
  key: keyToKeyModel(response.key),
  createdAt: toDateOrNull(response.created_at)!,
  updatedAt: toDateOrNull(response.updated_at)!,
});

export async function getAllLoans(): Promise<KeyLoanModel[]> {
  try {
    const response = await axiosClient.get<KeyLoan[]>('/key-loans', {
      headers: getAuthorizationHeaders(),
    });

    return response.data.map((loan) => keyLoanToLoanModel(loan));
  } catch (error) {
    throw new Error('Erro no Servidor.Tente Novamente.');
  }
}
