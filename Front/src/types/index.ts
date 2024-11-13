import { Events } from "../services/Events";

export interface Authorization {
  userId: string;
  accessToken: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  level: string;
}

export interface Key {
  id: number;
  name: string;
  is_avaible: number;
  created_at: string | null;
  updated_at: string | null;
}

export interface KeyLoan {
  id: number;
  user_id: number;
  key_id: number;
  reason: string;
  responsible_name: string;
  responsible_register: string;
  responsible_phone: string;
  created_at: string | null;
  updated_at: string | null;
  key: Key;
}

export interface Visitor {
  id: number;
  user_id: number;
  responsiblePerson: User;
  reason: string;
  nature: string;
  event_id?: number;
  event: Events;
  key_id?: number;
  key: Key;
  name: string;
  cpf: string;
  phone: string;
  created_at: string | null;
  updated_at: string | null;
}
