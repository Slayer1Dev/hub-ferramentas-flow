// src/lib/supabaseClient.ts (versão com debug)

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Linhas de Debug: Vamos ver o que o app está recebendo da Vercel
console.log("Supabase URL from env:", supabaseUrl);
console.log("Supabase Anon Key from env:", supabaseAnonKey ? 'Loaded' : 'Missing');

if (!supabaseUrl || !supabaseAnonKey) {
  // O erro original agora é mais descritivo
  throw new Error(`Supabase env variables are invalid. URL: ${supabaseUrl}, Key Loaded: ${!!supabaseAnonKey}`);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)