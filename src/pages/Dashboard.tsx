// src/pages/Dashboard.tsx (Versão Definitiva)

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Settings, 
  MessageSquare, 
  Calculator, 
  Network, 
  Search, 
  BarChart3, 
  User,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

// Componentes de conteúdo (placeholders para simplicidade)
const DashboardContent = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="bg-[#1a1a1a] border-gray-800"><CardHeader className="pb-2"><CardDescription className="text-gray-400">Vendas Hoje</CardDescription><CardTitle className="text-3xl text-green-400">R$ 2.847</CardTitle></CardHeader></Card>
      <Card className="bg-[#1a1a1a] border-gray-800"><CardHeader className="pb-2"><CardDescription className="text-gray-400">Perguntas Respondidas</CardDescription><CardTitle className="text-3xl text-blue-400">47</CardTitle></CardHeader></Card>
      <Card className="bg-[#1a1a1a] border-gray-800"><CardHeader className="pb-2"><CardDescription className="text-gray-400">Produtos Ativos</CardDescription><CardTitle className="text-3xl text-white">128</CardTitle></CardHeader></Card>
      <Card className="bg-[#1a1a1a] border-gray-800"><CardHeader className="pb-2"><CardDescription className="text-gray-400">Taxa Conversão</CardDescription><CardTitle className="text-3xl text-purple-400">12.5%</CardTitle></CardHeader></Card>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-[#1a1a1a] border-gray-800"><CardHeader><CardTitle className="text-white">Vendas dos Últimos 7 Dias</CardTitle></CardHeader><CardContent><div className="h-48 flex items-end gap-2">{[40, 65, 45, 80, 55, 90, 70].map((height, i) => (<motion.div key={i} initial={{ height: 0 }} animate={{ height: `${height}%` }} transition={{ delay: i * 0.1, duration: 0.5 }} className="bg-blue-500 rounded-t-lg flex-1 min-h-[4px]"/>))}</div></CardContent></Card>
      <Card className="bg-[#1a1a1a] border-gray-800"><CardHeader><CardTitle className="text-white">Alertas</CardTitle></CardHeader><CardContent className="space-y-3"><div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg"><p className="text-orange-400 text-sm font-medium">⚠️ 3 produtos sem estoque</p></div><div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg"><p className="text-green-400 text-sm font-medium">✅ 15 perguntas respondidas automaticamente</p></div></CardContent></Card>
    </div>
  </div>
);
const ChatContent = () => ( <div className="text-white">Página de Respostas IA em construção...</div> );
const CalculatorContent = () => ( <div className="text-white">Página da Calculadora em construção...</div> );
const StockContent = () => ( <div className="text-white">Página de Estoque em construção...</div> );
const SEOContent = () => ( <div className="text-white">Página de Otimizador SEO em construção...</div> );

const menuItems = [
  { id: "dashboard", title: "Dashboard", icon: BarChart3 },
  { id: "chat", title: "Respostas IA", icon: MessageSquare },
  { id: "calculator", title: "Calculadora", icon: Calculator },
  { id: "stock", title: "Estoque", icon: Network },
  { id: "seo", title: "SEO Optimizer", icon: Search },
  { id: "settings", title: "Configurações", icon: Settings }, // Link para Configurações
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleMenuClick = (id: string) => {
    if (id === 'settings') {
      navigate('/settings');
    } else {
      setActiveTab(id);
      // Opcional: mudar a URL também para as abas, se desejar no futuro
      // navigate(`/dashboard/${id}`); 
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return <DashboardContent />;
      case "chat": return <ChatContent />;
      case "calculator": return <CalculatorContent />;
      case "stock": return <StockContent />;
      case "seo": return <SEOContent />;
      default: return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex">
      <motion.div
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 80 }}
        className="bg-[#1a1a1a] border-r border-gray-800 flex flex-col"
      >
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center"><Settings className="w-5 h-5 text-white" /></div>
            {sidebarOpen && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-bold text-white">Hub Tools</motion.div>)}
          </div>
        </div>
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === item.id ? "bg-blue-500 text-white shadow-lg" : "text-gray-400 hover:text-white hover:bg-gray-800"}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && (<motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-medium">{item.title}</motion.span>)}
              </motion.button>
            ))}
          </div>
        </nav>
        <div className="p-4 border-t border-gray-800 space-y-2">
            <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white hover:bg-gray-800" onClick={() => setSidebarOpen(!sidebarOpen)}>
                {sidebarOpen ? <X className="w-5 h-5 mr-3" /> : <Menu className="w-5 h-5" />}
                {sidebarOpen && "Recolher"}
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white hover:bg-gray-800"><User className="w-5 h-5 mr-3" />{sidebarOpen && "Perfil"}</Button>
            <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-gray-800"><LogOut className="w-5 h-5 mr-3" />{sidebarOpen && "Sair"}</Button>
        </div>
      </motion.div>
      <div className="flex-1 flex flex-col">
        <header className="bg-[#1a1a1a] border-b border-gray-800 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">{menuItems.find(item => item.id === activeTab)?.title || "Configurações"}</h1>
                    <p className="text-gray-400 mt-1">Gerencie suas vendas com inteligência</p>
                </div>
                <div className="flex items-center gap-4"><div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center"><User className="w-5 h-5 text-white" /></div></div>
            </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;