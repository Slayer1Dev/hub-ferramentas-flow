// src/api/ml/callback.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// Função para obter o usuário da sessão a partir do cookie da Vercel
async function getUserIdFromRequest(req: VercelRequest): Promise<string | null> {
  try {
    const token = req.cookies['sb-access-token']; // Nome padrão do cookie do Supabase
    if (!token) return null;

    const { data: { user } } = await createClient(
        process.env.VITE_SUPABASE_URL!,
        process.env.VITE_SUPABASE_ANON_KEY!
    ).auth.getUser(token);
    
    return user?.id || null;
  } catch (error) {
    console.error("Error getting user from token:", error);
    return null;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { code } = req.query;

  if (!code || typeof code !== 'string') {
    return res.status(400).send('Código de autorização inválido ou ausente.');
  }

  // Identifica o usuário que iniciou o processo
  const userId = await getUserIdFromRequest(req);
  if (!userId) {
    return res.status(401).send('Não foi possível identificar o usuário. Por favor, faça login novamente.');
  }
  
  // Troca o código pelos tokens
  const tokenUrl = 'https://api.mercadolibre.com/oauth/token';
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: process.env.MERCADO_LIVRE_APP_ID!,
    client_secret: process.env.MERCADO_LIVRE_CLIENT_SECRET!,
    code: code,
    redirect_uri: 'https://hub-ferramentas-flow.vercel.app/api/ml/callback',
  });

  try {
    const mlResponse = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: body.toString(),
    });

    const tokens = await mlResponse.json();

    if (!mlResponse.ok) {
      throw new Error(`Erro do Mercado Livre: ${JSON.stringify(tokens)}`);
    }

    // Salva os tokens no banco de dados usando a chave de admin
    const supabaseAdmin = createClient(
        process.env.VITE_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    
    const { error: updateError } = await supabaseAdmin
      .from('profiles')
      .update({
        ml_access_token: tokens.access_token,
        ml_refresh_token: tokens.refresh_token,
        ml_user_id: tokens.user_id,
      })
      .eq('id', userId);

    if (updateError) {
      throw updateError;
    }

    // Redireciona de volta para o dashboard com uma mensagem de sucesso
    res.redirect('/dashboard?ml_connected=true');

  } catch (error) {
    console.error('Erro no fluxo de callback do ML:', error);
    res.redirect('/dashboard?ml_error=true');
  }
}