// pages/api/click.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await supabase.rpc('increment_click_count');
    const { data, error } = await supabase.from('click_counts').select('count').eq('id', 1).single();
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json({ count: data.count });
  } else if (req.method === 'GET') {
    const { data, error } = await supabase.from('click_counts').select('count').eq('id', 1).single();
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json({ count: data.count });
  }
}
