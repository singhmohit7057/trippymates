import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { mockCaptains } from '../data/mock';
import type { Captain } from '../types';

export function useCaptains() {
  const [data, setData] = useState<Captain[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setData(mockCaptains);
      setLoading(false);
      return;
    }

    supabase
      .from('captains')
      .select('*')
      .order('rating', { ascending: false })
      .then(({ data: rows, error: err }) => {
        if (err) setError(err.message);
        else setData((rows as Captain[]) || []);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}
