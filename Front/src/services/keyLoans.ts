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

export interface CreateKeyLoanPayload {
  keyId: number;
  reason: string;
  responsiblePerson: {
    name: string;
    register: string;
    phone: string;
  };
}

export interface EditKeyLoanPayload extends CreateKeyLoanPayload {
  isAvaible: boolean;
}


const keyLoanToLoanModel = (response: KeyLoan): KeyLoanModel => ({
  ...response,
  key: keyToKeyModel(response.key),
  createdAt: toDateOrNull(response.created_at)!,
  updatedAt: toDateOrNull(response.updated_at)!,
});

export function keyModeltoTable(data: KeyLoanModel) {
  return {
    Nome: data.responsible_name,
    Telefone: data.responsible_phone,
    'N. Matricula': data.responsible_register,
    Motivo: data.reason,
    Chave: data.key.name,
    Bloco: data.key.bloco,
    Piso: data.key.piso,
    'Criado em': data.createdAt,
    'Foi devolvido?': data.key.is_avaible ? 'Sim' : 'Não',
    'Devolvido em': data.updatedAt || 'Não foi devolvido ainda',
  };
}

export async function getAllLoans(): Promise<KeyLoanModel[]> {
  try {
    const response = await axiosClient.get<KeyLoan[]>('/key-loans', {
      headers: getAuthorizationHeaders(),
    });

    return response.data.map((loan) => keyLoanToLoanModel(loan));
  } catch (error) {
    localStorage.clear();
    throw new Error('Erro no Servidor.Tente Novamente.');
  }
}

export async function getLoanById(loanId: number) {
  try {
    const response = await axiosClient.get(`/key-loans/${loanId}`, { headers: getAuthorizationHeaders() });
    return keyLoanToLoanModel(response.data);
  } catch (error) {
    localStorage.clear();
    throw new Error('Erro no Servidor.Tente Novamente.');
  }
}

export async function createKeyLoan(payload: CreateKeyLoanPayload) {
  try {
    const response = await axiosClient.post(`/key-loans`, { ...payload }, { headers: getAuthorizationHeaders() });
    return keyLoanToLoanModel(response.data);
  } catch (error) {
    localStorage.clear();
    throw new Error('Erro no Servidor.Tente Novamente.');
  }
}

export async function deleteKeyLoan(loanId: number) {
  try {
    const response = await axiosClient.delete(`/key-loans/${loanId}`, { headers: getAuthorizationHeaders() });
    return response.status === 200;
  } catch (error) {
    localStorage.clear();
    throw new Error('Erro no Servidor.Tente Novamente.');
  }
}

export async function editKeyLoan(loanId: number, payload: EditKeyLoanPayload) {
  try {
    const response = await axiosClient.put(
      `/key-loans/${loanId}`,
      { ...payload },
      { headers: getAuthorizationHeaders() },
    );

    return response.data;
  } catch (error) {
    localStorage.clear();
    throw new Error('Erro no Servidor.Tente Novamente.');
  }
}
