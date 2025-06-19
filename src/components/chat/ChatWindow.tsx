
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Send, Sparkles, User, Bot } from 'lucide-react';
import { Question, Answer } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface ChatWindowProps {
  question: Question;
  onBack: () => void;
  onAnswered: () => void;
}

export const ChatWindow = ({ question, onBack, onAnswered }: ChatWindowProps) => {
  const [answer, setAnswer] = useState('');
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchAnswers();
  }, [question.id]);

  const fetchAnswers = async () => {
    try {
      const response = await fetch(`/api/questions/${question.id}/answers`);
      const data = await response.json();
      setAnswers(data);
    } catch (error) {
      console.error('Error fetching answers:', error);
    }
  };

  const handleSendAnswer = async () => {
    if (!answer.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/questions/${question.id}/answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer, isAutomatic: false }),
      });

      if (response.ok) {
        setAnswer('');
        fetchAnswers();
        onAnswered();
        toast({
          title: "Resposta enviada",
          description: "Sua resposta foi enviada com sucesso!",
        });
      }
    } catch (error) {
      console.error('Error sending answer:', error);
      toast({
        title: "Erro",
        description: "Erro ao enviar resposta. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateWithAI = async () => {
    setGenerating(true);
    try {
      const response = await fetch('/api/ia/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId: question.id }),
      });

      const data = await response.json();
      if (response.ok) {
        setAnswer(data.answer);
        toast({
          title: "Resposta gerada",
          description: "Resposta gerada com IA. Revise antes de enviar.",
        });
      }
    } catch (error) {
      console.error('Error generating answer:', error);
      toast({
        title: "Erro",
        description: "Erro ao gerar resposta. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <div>
          <h2 className="text-xl font-bold text-white">Chat - Pergunta</h2>
          <p className="text-gray-400 text-sm">
            {new Date(question.createdAt).toLocaleString('pt-BR')}
          </p>
        </div>
      </div>

      <Card className="bg-[#1a1a1a] border-gray-800">
        <CardContent className="p-6">
          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
            {/* Pergunta original */}
            <div className="flex items-start space-x-3">
              <div className="bg-gray-600 rounded-full p-2">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="bg-gray-700 rounded-lg p-3 max-w-xs">
                <p className="text-white text-sm">{question.questionText}</p>
              </div>
            </div>

            {/* Respostas */}
            {answers.map((ans) => (
              <div key={ans.id} className="flex items-start space-x-3 justify-end">
                <div className="bg-blue-500 rounded-lg p-3 max-w-xs">
                  <p className="text-white text-sm">{ans.answerText}</p>
                  <div className="flex items-center mt-2 text-xs text-blue-100">
                    {ans.isAutomatic ? <Bot className="h-3 w-3 mr-1" /> : <User className="h-3 w-3 mr-1" />}
                    {ans.isAutomatic ? 'IA' : 'Manual'}
                  </div>
                </div>
                <div className="bg-blue-500 rounded-full p-2">
                  {ans.isAutomatic ? <Bot className="h-4 w-4 text-white" /> : <User className="h-4 w-4 text-white" />}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <div className="flex space-x-2">
              <Input
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Digite sua resposta..."
                className="bg-gray-800 border-gray-700 text-white"
                onKeyPress={(e) => e.key === 'Enter' && handleSendAnswer()}
              />
              <Button onClick={handleSendAnswer} disabled={loading || !answer.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            <Button 
              onClick={handleGenerateWithAI} 
              disabled={generating}
              variant="outline"
              className="w-full"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              {generating ? 'Gerando...' : 'Gerar com IA'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
