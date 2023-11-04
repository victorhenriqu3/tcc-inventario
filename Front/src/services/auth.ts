import { Authorization } from '../types';
import { axiosClient } from './BaseApi';

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
