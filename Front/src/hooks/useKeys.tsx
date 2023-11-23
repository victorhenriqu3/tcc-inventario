import { useEffect, useState } from "react";
import { KeyModel, getAllKeys } from "../services/Key";

export default function useKeys() {
  const [keys, setKeys] = useState<KeyModel[] | null>(null);
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getKeys = async () => {
      try {
        const allLoans = await getAllKeys()
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