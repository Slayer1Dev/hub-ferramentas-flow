
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IAConfig as IAConfigType } from '@/types';
import { useToast } from '@/hooks/use-toast';

export const IAConfig = () => {
  const [config, setConfig] = useState<IAConfigType>({
    userId: 'current-user', // TODO: Replace with actual user ID from auth
    tone: 'friendly_seller',
    context: '',
    channels: {
      telegram: false,
      whatsapp: false,
      email: false,
    },
    updatedAt: new Date().toISOString(),
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await fetch('/api/ia-config');
      if (response.ok) {
        const data = await response.json();
        setConfig(data);
      }
    } catch (error) {
      console.error('Error fetching config:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ia-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      if (response.ok) {
        toast({
          title: "Configurações salvas",
          description: "Suas configurações de IA foram atualizadas!",
        });
      }
    } catch (error) {
      console.error('Error saving config:', error);
      toast({
        title: "Erro",
        description: "Erro ao salvar configurações. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toneOptions = [
    { value: 'formal', label: 'Formal' },
    { value: 'casual', label: 'Casual' },
    { value: 'technical', label: 'Técnico' },
    { value: 'friendly_seller', label: 'Vendedor Amigável' },
  ];

  const generatePreview = () => {
    const DEFAULT_GEMINI_PROMPT = `Você é um assistente de vendas especializado em e-commerce do Mercado Livre. 
Responda sempre de forma ${config.tone === 'formal' ? 'formal e profissional' : 
  config.tone === 'casual' ? 'descontraída e amigável' : 
  config.tone === 'technical' ? 'técnica e detalhada' : 
  'amigável e focada em vendas'}.

Contexto da loja: ${config.context || '[Contexto não definido]'}

Responda a seguinte pergunta de forma útil e que incentive a compra:

Pergunta: [Pergunta do usuário aparecerá aqui]`;

    return DEFAULT_GEMINI_PROMPT;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Configurações da IA</h2>
        <p className="text-gray-400">Configure como a IA responde às perguntas dos clientes</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#1a1a1a] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Configurações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-gray-300">Tom da IA</Label>
              <Select value={config.tone} onValueChange={(value: any) => setConfig({...config, tone: value})}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {toneOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-gray-300">Contexto da Loja</Label>
              <Textarea
                value={config.context}
                onChange={(e) => setConfig({...config, context: e.target.value})}
                placeholder="Descreva sua loja, produtos principais, diferenciais..."
                className="bg-gray-800 border-gray-700 text-white min-h-24"
              />
            </div>

            <div>
              <Label className="text-gray-300 mb-3 block">Canais de Notificação</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="telegram"
                    checked={config.channels.telegram}
                    onCheckedChange={(checked) => 
                      setConfig({
                        ...config, 
                        channels: {...config.channels, telegram: !!checked}
                      })
                    }
                  />
                  <Label htmlFor="telegram" className="text-gray-300">Telegram</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="whatsapp"
                    checked={config.channels.whatsapp}
                    onCheckedChange={(checked) => 
                      setConfig({
                        ...config, 
                        channels: {...config.channels, whatsapp: !!checked}
                      })
                    }
                  />
                  <Label htmlFor="whatsapp" className="text-gray-300">WhatsApp</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="email"
                    checked={config.channels.email}
                    onCheckedChange={(checked) => 
                      setConfig({
                        ...config, 
                        channels: {...config.channels, email: !!checked}
                      })
                    }
                  />
                  <Label htmlFor="email" className="text-gray-300">E-mail</Label>
                </div>
              </div>
            </div>

            <Button onClick={handleSave} disabled={loading} className="w-full">
              {loading ? 'Salvando...' : 'Salvar Configurações'}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a1a] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Preview do Prompt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 p-4 rounded-lg">
              <pre className="text-gray-300 text-sm whitespace-pre-wrap overflow-auto max-h-80">
                {generatePreview()}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
