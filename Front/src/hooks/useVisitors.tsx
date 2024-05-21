import { useEffect, useState } from 'react';
import { VisitorsModel, getAllVisitors } from '../services/visitors';

export default function useVisitors() {
  const [Visitors, setVisitors] = useState<VisitorsModel[]>([]);
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getVisitorss = async () => {
      try {
        const allVisitors = await getAllVisitors();
        setVisitors(allVisitors);
      } finally {
        setFetched(true);
        setLoading(false);
      }
    };
    getVisitorss();
  }, [fetched]);
  return { Visitors, loading, fetched };
}
