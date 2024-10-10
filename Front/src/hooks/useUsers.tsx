import { useEffect, useState } from 'react';
import { getAllUsers } from '../services/users';
import { User } from '../types';

export default function useUsers() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getName = async () => {
      try {
        const currentUsers = await getAllUsers();
        setUsers(currentUsers);
      } finally {
        setFetched(true);
        setLoading(false);
      }
    };
    getName();
  }, [fetched]);
  return { users, loading, fetched };
}
