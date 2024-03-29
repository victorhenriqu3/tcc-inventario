import { toDateOrNull } from '../helpers/toDateOrNull';
import { Visitor } from '../types';
import { axiosClient, getAuthorizationHeaders } from './BaseApi';

export interface VisitorsModel {
  id: number;
  user_id: number;
  reason: string;
  name: string;
  cpf: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateVisitorPayload {
  reason: string;
  responsiblePerson: {
    name: string;
    cpf: string;
    phone: string;
  };
}

const visitorToVisitorModel = (response: Visitor): VisitorsModel => ({
  ...response,
  createdAt: toDateOrNull(response.created_at)!,
  updatedAt: toDateOrNull(response.updated_at)!,
});
export async function getAllVisitors(): Promise<VisitorsModel[]> {
  try {
    const response = await axiosClient.get<Visitor[]>('/visitors', { headers: getAuthorizationHeaders() });

    return response.data.map((visitor) => visitorToVisitorModel(visitor));
  } catch (error) {
    throw new Error('Erro no Servidor.Tente Novamente.');
  }
}

export async function getVisitorById(visitorId: number) {
  try {
    const response = await axiosClient.get(`/visitors/${visitorId}`, { headers: getAuthorizationHeaders() });
    return visitorToVisitorModel(response.data)
  } catch (error) {
    throw new Error('Erro no Servidor.Tente Novamente.');
  }
}

export async function editVisitor(visitorId: number, params: CreateVisitorPayload) {
  try {
    const response = await axiosClient.put(`/visitors/${visitorId}/edit`, { ...params }, { headers: getAuthorizationHeaders() });
    return response.status === 200;
  } catch (error) {
    throw new Error('Erro no Servidor.Tente Novamente.');
  }

}

export async function updateVisitor(visitorId: number) {
  try {
    const response = await axiosClient.put(`/visitors/${visitorId}`, {}, { headers: getAuthorizationHeaders() });
    return response.status === 200;
  } catch (error) {
    throw new Error('Erro no Servidor.Tente Novamente.');
  }

}

export async function createVisitor(params: CreateVisitorPayload): Promise<VisitorsModel> {
  try {
    const response = await axiosClient.post('/visitors', { ...params }, { headers: getAuthorizationHeaders() });

    return visitorToVisitorModel(response.data);
  } catch (error) {
    throw new Error('Erro no Servidor.Tente Novamente.');
  }
}

export async function deleteVisitor(visitorId: number) {
  try {
    const response = await axiosClient.delete(`/visitors/${visitorId}`, { headers: getAuthorizationHeaders() });
    return response.status === 200;
  } catch (error) {
    throw new Error('Erro no Servidor.Tente Novamente.');
  }
}
