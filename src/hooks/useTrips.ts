import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { mockTrips } from '../data/mock';
import type { Trip } from '../types';

export function useTrips(type?: 'domestic' | 'international' | 'corporate') {
  const [data, setData] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      const filtered = type ? mockTrips.filter(t => t.type === type) : mockTrips;
      setData(filtered);
      setLoading(false);
      return;
    }

    let query = supabase.from('trips').select('*');
    if (type) query = query.eq('type', type);

    query.order('created_at', { ascending: false }).then(({ data: rows, error: err }) => {
      if (err) setError(err.message);
      else setData((rows as Trip[]) || []);
      setLoading(false);
    });
  }, [type]);

  return { data, loading, error };
}
