import { useEffect, useState } from 'react';
import { getCurrentUser } from '../services/auth';
import { User } from '../types';

export default function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getName = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } finally {
        setFetched(true);
        setLoading(false);
      }
    };
    getName();
  }, [fetched]);
  return { user, loading, fetched };
}
