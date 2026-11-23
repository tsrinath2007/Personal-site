import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://edlbcxkbyjswvapgkocf.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_publishable_PFniv89LEGFE2u-oPCaCWg_ZhTWT91G";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
