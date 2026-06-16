import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wrgboidwhishbjihpymz.supabase.co';
const SUPABASE_PUBLIC_KEY = 'sb_publishable_BdMteWL2WOGbcFQbipbVRA_SZlWjoeO';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
