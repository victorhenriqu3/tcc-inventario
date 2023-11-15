import { toDateOrNull } from '../helpers/toDateOrNull';
import { Key } from '../types';

export interface KeyModel {
  id: number;
  name: string;
  is_avaible: boolean;
  createdAt: string;
  updatedAt: string;
}

export const keyToKeyModel = (response: Key): KeyModel => ({
  ...response,
  is_avaible: response.is_avaible === 0,
  createdAt: toDateOrNull(response.created_at)!,
  updatedAt: toDateOrNull(response.updated_at)!,
});
