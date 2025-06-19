// src/pages/SettingsPage.tsx

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Configurações e Integrações</h2>
        <p className="text-gray-400">Gerencie suas conexões com outras plataformas.</p>
      </div>

      <Card className="bg-[#1a1a1a] border-gray-800 max-w-lg">
        <CardHeader>
          <CardTitle className="text-white">Conexão com Mercado Livre</CardTitle>
          <CardDescription className="text-gray-400">
            Conecte sua conta para começar a gerenciar suas perguntas e estoque.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <a href="/api/ml/connect">
            <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500">
              Conectar com Mercado Livre
            </Button>
          </a>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;