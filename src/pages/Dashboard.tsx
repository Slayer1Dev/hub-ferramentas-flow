
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

const menuItems = [
  { id: "dashboard", title: "Dashboard", icon: BarChart3 },
  { id: "chat", title: "Respostas IA", icon: MessageSquare },
  { id: "calculator", title: "Calculadora", icon: Calculator },
  { id: "stock", title: "Estoque", icon: Network },
  { id: "seo", title: "SEO Optimizer", icon: Search },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent />;
      case "chat":
        return <ChatContent />;
      case "calculator":
        return <CalculatorContent />;
      case "stock":
        return <StockContent />;
      case "seo":
        return <SEOContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex">
      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 80 }}
        className="bg-[#1a1a1a] border-r border-gray-800 flex flex-col"
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl font-bold text-white"
              >
                Hub Tools
              </motion.div>
            )}
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === item.id
                    ? "bg-blue-500 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-medium"
                  >
                    {item.title}
                  </motion.span>
                )}
              </motion.button>
            ))}
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-gray-800 space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-400 hover:text-white hover:bg-gray-800"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="w-5 h-5 mr-3" /> : <Menu className="w-5 h-5" />}
            {sidebarOpen && "Recolher"}
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <User className="w-5 h-5 mr-3" />
            {sidebarOpen && "Perfil"}
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-gray-800"
          >
            <LogOut className="w-5 h-5 mr-3" />
            {sidebarOpen && "Sair"}
          </Button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-[#1a1a1a] border-b border-gray-800 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">
                {menuItems.find(item => item.id === activeTab)?.title || "Dashboard"}
              </h1>
              <p className="text-gray-400 mt-1">
                Gerencie suas vendas com inteligência
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

// Dashboard Content Component
const DashboardContent = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="bg-[#1a1a1a] border-gray-800">
        <CardHeader className="pb-2">
          <CardDescription className="text-gray-400">Vendas Hoje</CardDescription>
          <CardTitle className="text-3xl text-green-400">R$ 2.847</CardTitle>
        </CardHeader>
      </Card>
      
      <Card className="bg-[#1a1a1a] border-gray-800">
        <CardHeader className="pb-2">
          <CardDescription className="text-gray-400">Perguntas Respondidas</CardDescription>
          <CardTitle className="text-3xl text-blue-400">47</CardTitle>
        </CardHeader>
      </Card>
      
      <Card className="bg-[#1a1a1a] border-gray-800">
        <CardHeader className="pb-2">
          <CardDescription className="text-gray-400">Produtos Ativos</CardDescription>
          <CardTitle className="text-3xl text-white">128</CardTitle>
        </CardHeader>
      </Card>
      
      <Card className="bg-[#1a1a1a] border-gray-800">
        <CardHeader className="pb-2">
          <CardDescription className="text-gray-400">Taxa Conversão</CardDescription>
          <CardTitle className="text-3xl text-purple-400">12.5%</CardTitle>
        </CardHeader>
      </Card>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-[#1a1a1a] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Vendas dos Últimos 7 Dias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 flex items-end gap-2">
            {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-blue-500 rounded-t-lg flex-1 min-h-[4px]"
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#1a1a1a] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Alertas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
            <p className="text-orange-400 text-sm font-medium">⚠️ 3 produtos sem estoque</p>
          </div>
          <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
            <p className="text-green-400 text-sm font-medium">✅ 15 perguntas respondidas automaticamente</p>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

// Chat Content Component
const ChatContent = () => (
  <div className="space-y-6">
    <Card className="bg-[#1a1a1a] border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Respostas Automáticas</CardTitle>
        <CardDescription className="text-gray-400">
          Configure suas respostas inteligentes para perguntas frequentes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-gray-300 text-sm mb-2">"Qual o prazo de entrega?"</p>
            <p className="text-blue-400 text-sm">Resposta: "Entrega em 3-5 dias úteis. Enviamos no mesmo dia para compras até 15h!"</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-gray-300 text-sm mb-2">"Tem garantia?"</p>
            <p className="text-blue-400 text-sm">Resposta: "Sim! 12 meses de garantia. Qualquer problema, trocamos sem complicação!"</p>
          </div>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600">
          Adicionar Nova Resposta
        </Button>
      </CardContent>
    </Card>
  </div>
);

// Calculator Content Component
const CalculatorContent = () => (
  <div className="space-y-6">
    <Card className="bg-[#1a1a1a] border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Calculadora de Lucro</CardTitle>
        <CardDescription className="text-gray-400">
          Calcule o preço ideal para seus produtos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-gray-400 text-sm">Custo do produto</label>
            <div className="bg-gray-800 rounded-lg p-3 text-white text-lg font-semibold">R$ 50,00</div>
          </div>
          <div>
            <label className="text-gray-400 text-sm">Margem desejada</label>
            <div className="bg-gray-800 rounded-lg p-3 text-white text-lg font-semibold">40%</div>
          </div>
        </div>
        
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-gray-400 text-sm">Mercado Livre</p>
              <p className="text-2xl font-bold text-blue-400">R$ 89,90</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Shopee</p>
              <p className="text-2xl font-bold text-blue-400">R$ 85,50</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Stock Content Component
const StockContent = () => (
  <div className="space-y-6">
    <Card className="bg-[#1a1a1a] border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Estoque Unificado</CardTitle>
        <CardDescription className="text-gray-400">
          Sincronize o estoque entre todos os seus anúncios
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="bg-gray-700 rounded-lg h-20 mb-3"></div>
              <p className="text-white font-semibold">Smartphone XYZ</p>
              <p className="text-green-400 text-sm">Estoque: 15 unidades</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="bg-gray-700 rounded-lg h-20 mb-3"></div>
              <p className="text-white font-semibold">Smartphone XYZ Pro</p>
              <p className="text-green-400 text-sm">Estoque: 15 unidades</p>
            </CardContent>
          </Card>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-4">↕️ Estoque sincronizado automaticamente</p>
          <Button className="bg-blue-500 hover:bg-blue-600">
            Gerenciar Produtos
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
);

// SEO Content Component
const SEOContent = () => (
  <div className="space-y-6">
    <Card className="bg-[#1a1a1a] border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Otimizador SEO</CardTitle>
        <CardDescription className="text-gray-400">
          Melhore seus títulos e descrições para mais visibilidade
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="text-gray-400 text-sm">Título atual</label>
          <div className="bg-gray-800 rounded-lg p-3 text-white text-sm">Smartphone Android Novo</div>
        </div>
        
        <div>
          <label className="text-green-400 text-sm font-semibold">Título otimizado</label>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-white text-sm">
            Smartphone Android 128GB Câmera 48MP Tela 6.1" Dual Chip 5G Novo Lacrado
          </div>
        </div>
        
        <div className="flex items-center justify-between bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <span className="text-blue-400 text-sm">Score SEO</span>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-3 h-6 bg-blue-400 rounded-sm"></div>
            ))}
          </div>
        </div>
        
        <Button className="bg-blue-500 hover:bg-blue-600">
          Otimizar Título
        </Button>
      </CardContent>
    </Card>
  </div>
);

export default Dashboard;
