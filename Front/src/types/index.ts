export interface Authorization {
  userId: string;
  accessToken: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
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
