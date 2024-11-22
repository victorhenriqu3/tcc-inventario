import { useEffect, useState } from 'react';
import { KeyModel, getAllAvaibleKeys, getAllKeys } from '../services/Key';

export default function useKeys(onlyAvaible?: boolean) {
  const [keys, setKeys] = useState<KeyModel[] | null>(null);
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getKeys = async () => {
      try {
        const allLoans = onlyAvaible ? await getAllAvaibleKeys() : await getAllKeys();
        setKeys(allLoans);
      } finally {
        setFetched(true);
        setLoading(false);
      }
    };
    getKeys();
  }, [fetched]);
  return { keys, loading, fetched };
}
