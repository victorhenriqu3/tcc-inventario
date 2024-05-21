import { useEffect, useState } from "react";
import { KeyLoanModel, getAllLoans } from "../services/keyLoans";

export default function useKeyLoans() {
  const [loans, setLoans] = useState<KeyLoanModel[]>([]);
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getLoans = async () => {
      try {
        const allLoans = await getAllLoans()
        setLoans(allLoans);
      } finally {
        setFetched(true);
        setLoading(false);
      }
    };
    getLoans();
  }, [fetched]);
  return { loans, loading, fetched };
}