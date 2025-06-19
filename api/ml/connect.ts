// src/api/ml/connect.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const MERCADO_LIVRE_APP_ID = process.env.MERCADO_LIVRE_APP_ID;
  
  // Esta URL DEVE ser a mesma que você configurou no seu App do Mercado Livre
  const REDIRECT_URI = 'https://hub-ferramentas-flow.vercel.app/api/ml/callback';

  const authUrl = `https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=${MERCADO_LIVRE_APP_ID}&redirect_uri=${REDIRECT_URI}`;

  // Redireciona o usuário para a página de autorização do ML
  res.redirect(302, authUrl);
}