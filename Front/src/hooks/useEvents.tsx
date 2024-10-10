import { useEffect, useState } from 'react';
import { getAllEvents } from '../services/Events';

export interface Events {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export default function useEvents() {
  const [events, setEvents] = useState<Events[] | null>(null);
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getKeys = async () => {
      try {
        const allEvents = await getAllEvents();
        setEvents(allEvents);
      } finally {
        setFetched(true);
        setLoading(false);
      }
    };
    getKeys();
  }, [fetched]);
  return { events, loading, fetched };
}
