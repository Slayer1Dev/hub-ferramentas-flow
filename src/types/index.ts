
export interface Question {
  id: string;
  userId: string;
  questionText: string;
  status: 'pending' | 'answered' | 'ignored';
  mlId?: string;
  productTitle?: string;
  createdAt: string;
}

export interface Answer {
  id: string;
  questionId: string;
  answerText: string;
  timestamp: string;
  isAutomatic: boolean;
}

export interface IAConfig {
  userId: string;
  tone: 'formal' | 'casual' | 'technical' | 'friendly_seller';
  context: string;
  channels: {
    telegram: boolean;
    whatsapp: boolean;
    email: boolean;
  };
  updatedAt: string;
}

export interface StockGroup {
  id: string;
  name: string;
  quantity: number;
  mlIds: string[];
  userId: string;
}

export interface PricingRequest {
  cost: number;
  desiredMargin: number;
  marketplace: string;
  commission: number;
  shippingCost: number;
  finalPrice: number;
}

export interface DashboardStats {
  totalSales: number;
  questionsAnswered: number;
  visits: number;
  dailyActivity: Array<{
    date: string;
    questions: number;
    sales: number;
  }>;
}
