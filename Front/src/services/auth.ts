import { Authorization } from '../types';
import { axiosClient, getAuthorizationHeaders } from './BaseApi';

export interface LoginWithCredentialsParams {
  email: string;
  password: string;
}

interface AuthorizationResponse {
  type: string;
  token: string;
  user_id: string;
}

const responseToAuthorization = (response: AuthorizationResponse): Authorization => ({
  accessToken: `${response.type} ${response.token}`,
  userId: response.user_id,
});

export async function loginWithCredentials(params: LoginWithCredentialsParams) {
  try {
    const response = await axiosClient.post<AuthorizationResponse>('/auth/login', {
      ...params,
    });

    return responseToAuthorization(response.data);
  } catch (_error) {
    throw new Error('Email e/ou senha inválido');
  }
}

export async function getCurrentUser() {
  try {
    const response = await axiosClient.get('/auth/me', {
      headers: getAuthorizationHeaders(),
    });

    return response.data;
  } catch (error) {
    localStorage.clear();
    throw new Error('Não foi possível identificar. Tente Novamente.');
  }
}
