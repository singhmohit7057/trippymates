import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { mockTestimonials } from '../data/mock';
import type { Testimonial } from '../data/mock';

export function useTestimonials() {
  const [data, setData] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setData(mockTestimonials);
      setLoading(false);
      return;
    }

    supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data: rows, error: err }) => {
        if (err) setError(err.message);
        else setData((rows as Testimonial[]) || []);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}
