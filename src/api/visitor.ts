// pages/api/visitor.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    /** カウント++ */
    await supabase.rpc('increment_visitor_count');
    const { data, error } = await supabase.from('visitor_counts').select('count').eq('id', 1).single();
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json({ count: data.count });
  } else if (req.method === 'GET') {
    /** 現在のカウントを取得 */
    const { data, error } = await supabase.from('visitor_counts').select('count').eq('id', 1).single();
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json({ count: data.count });
  }
}
