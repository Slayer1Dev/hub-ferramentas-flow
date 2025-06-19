
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, Clock, Package } from 'lucide-react';
import { Question } from '@/types';
import { ChatWindow } from './ChatWindow';

export const QuestionsList = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('/api/questions?status=pending');
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('pt-BR');
  };

  if (selectedQuestion) {
    return (
      <ChatWindow 
        question={selectedQuestion} 
        onBack={() => setSelectedQuestion(null)}
        onAnswered={fetchQuestions}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Perguntas Recebidas</h2>
          <p className="text-gray-400">Gerencie as perguntas dos seus anúncios</p>
        </div>
        <Button onClick={fetchQuestions} variant="outline">
          Atualizar
        </Button>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-[#1a1a1a] border-gray-800 animate-pulse">
              <CardContent className="p-4">
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-3/4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {questions.length === 0 ? (
            <Card className="bg-[#1a1a1a] border-gray-800">
              <CardContent className="p-8 text-center">
                <MessageSquare className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">Nenhuma pergunta pendente</p>
              </CardContent>
            </Card>
          ) : (
            questions.map((question) => (
              <Card 
                key={question.id} 
                className="bg-[#1a1a1a] border-gray-800 hover:bg-[#222] transition-colors cursor-pointer"
                onClick={() => setSelectedQuestion(question)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="secondary" className="bg-orange-500/10 text-orange-400">
                      {question.status === 'pending' ? 'Pendente' : 'Respondida'}
                    </Badge>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      {formatTimestamp(question.createdAt)}
                    </div>
                  </div>
                  
                  <p className="text-white mb-2">{question.questionText}</p>
                  
                  {question.productTitle && (
                    <div className="flex items-center text-gray-400 text-sm">
                      <Package className="h-4 w-4 mr-1" />
                      {question.productTitle}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};
