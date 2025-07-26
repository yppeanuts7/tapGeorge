import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('stats').select('*').eq('id', 1).single();
    if (error) return res.status(500).json({ error });
    res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const { type } = req.body;
    const column = type === 'click' ? 'clicks' : 'visits';

    const { data, error } = await supabase.rpc('increment_column', { row_id: 1, column_name: column });

    if (error) return res.status(500).json({ error });
    res.status(200).json({ success: true });
  }
}
