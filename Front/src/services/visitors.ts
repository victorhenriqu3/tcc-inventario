
import { toDateOrNull } from '../helpers/toDateOrNull';
import { Key, User, Visitor } from '../types';
import { axiosClient, getAuthorizationHeaders } from './BaseApi';
import { Events } from './Events';
import { KeyModel, keyToKeyModel } from './Key';

export interface VisitorsModel {
  id: number;
  user_id: number;
  responsiblePerson: User;
  reason: string;
  nature: string;
  event_id?: number;
  event: Events;
  key_id?: number;
  keyInfo: KeyModel;
  name: string;
  cpf: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateVisitorPayload {
  reason: string;
  nature: string;
  evento_id?: number;
  key_id?: number;
  responsableUserId: number;
  Person: {
    name: string;
    cpf: string;
    phone: string;
  };
}

const visitorToVisitorModel = (response: Visitor): VisitorsModel => ({
  ...response,
  keyInfo: keyToKeyModel(response.key),
  createdAt: toDateOrNull(response.created_at)!,
  updatedAt: toDateOrNull(response.updated_at)!,
});

export function visitorModeltoTable(data: VisitorsModel) {
  return {
    Nome: data.name,
    Telefone: data.phone,
    Documento: data.cpf,
    Motivo: data.reason,
    Bloco: data.keyInfo?.bloco,
    Piso: data.keyInfo?.piso,
    Saída: data.updatedAt ? 'Concluído' : 'Pendente',
    'Entrou em': data.createdAt,
    'Saiu em': data.updatedAt || 'Não Saiu ainda',
  };
}
export async function getAllVisitors(): Promise<VisitorsModel[]> {
  try {
    const response = await axiosClient.get<Visitor[]>('/visitors', { headers: getAuthorizationHeaders() });
    return response.data.map((visitor) => visitorToVisitorModel(visitor));
  } catch (error) {
    localStorage.clear();
    throw new Error('Erro no Servidor.Tente Novamente.');
  }
}

export async function getVisitorById(visitorId: number) {
  try {
    const response = await axiosClient.get(`/visitors/${visitorId}`, { headers: getAuthorizationHeaders() });
    return visitorToVisitorModel(response.data);
  } catch (error) {
    localStorage.clear();
    throw new Error('Não foi possível identificar. Tente Novamente.');
  }
}

export async function editVisitor(visitorId: number, params: CreateVisitorPayload) {
  try {
    const response = await axiosClient.put(
      `/visitors/${visitorId}/edit`,
      { ...params },
      { headers: getAuthorizationHeaders() },
    );
    return response.status === 200;
  } catch (error) {
    localStorage.clear();
    throw new Error('Não foi possível identificar. Tente Novamente.');
  }
}

export async function updateVisitor(visitorId: number) {
  try {
    const response = await axiosClient.put(`/visitors/${visitorId}`, {}, { headers: getAuthorizationHeaders() });
    return response.status === 200;
  } catch (error) {
    localStorage.clear();
    throw new Error('Não foi possível identificar. Tente Novamente.');
  }
}

export async function createVisitor(params: CreateVisitorPayload): Promise<VisitorsModel> {
  try {
    const response = await axiosClient.post('/visitors', { ...params }, { headers: getAuthorizationHeaders() });

    return visitorToVisitorModel(response.data);
  } catch (error) {
    localStorage.clear();
    throw new Error('Não foi possível identificar. Tente Novamente.');
  }
}

export async function deleteVisitor(visitorId: number) {
  try {
    const response = await axiosClient.delete(`/visitors/${visitorId}`, { headers: getAuthorizationHeaders() });
    return response.status === 200;
  } catch (error) {
    localStorage.clear();
    throw new Error('Não foi possível identificar. Tente Novamente.');
  }
}
