import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { mockDestinations } from '../data/mock';
import type { Destination } from '../types';

export function useDestinations() {
  const [data, setData] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setData(mockDestinations);
      setLoading(false);
      return;
    }

    supabase
      .from('destinations')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data: rows, error: err }) => {
        if (err) setError(err.message);
        else setData((rows as Destination[]) || []);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}
