import { axiosClient, getAuthorizationHeaders } from "./BaseApi";

export interface Events {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}


export async function getAllEvents(): Promise<Events[]> {
  try {
    const response = await axiosClient.get<Events[]>('/events', { headers: getAuthorizationHeaders() });

    return response.data
  } catch (error) {
    throw new Error('Error no Servidor. Tente Novamente');
  }
}

export async function registerEvents(event: Pick<Events, 'name' | 'description'>): Promise<Events> {
  try {
    const response = await axiosClient.post<Events>('/events', event, { headers: getAuthorizationHeaders() });
    return response.data;
  } catch (error) {
    throw new Error('Error no Servidor. Tente Novamente');
  }
}
