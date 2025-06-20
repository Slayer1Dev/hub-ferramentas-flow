// src/pages/Dashboard.tsx (VERSÃO FINAL SIMPLIFICADA)

import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom"; // IMPORTANTE: Link, Outlet, useLocation
import { motion } from "framer-motion";
import { 
  Settings, MessageSquare, Calculator, Network, 
  Search, BarChart3, User, LogOut, Menu, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Itens do menu agora são apenas para a barra lateral
const menuItems = [
  { id: "dashboard", title: "Dashboard", icon: BarChart3, path: "/dashboard" },
  { id: "chat", title: "Respostas IA", icon: MessageSquare, path: "/dashboard/chat" }, // Exemplo de sub-rotas futuras
  { id: "settings", title: "Configurações", icon: Settings, path: "/settings" },
];

// O conteúdo principal do dashboard, que não muda
const DashboardContent = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="bg-[#1a1a1a] border-gray-800"><CardHeader className="pb-2"><CardDescription className="text-gray-400">Vendas Hoje</CardDescription><CardTitle className="text-3xl text-green-400">R$ 2.847</CardTitle></CardHeader></Card>
      <Card className="bg-[#1a1a1a] border-gray-800"><CardHeader className="pb-2"><CardDescription className="text-gray-400">Perguntas Respondidas</CardDescription><CardTitle className="text-3xl text-blue-400">47</CardTitle></CardHeader></Card>
      <Card className="bg-[#1a1a1a] border-gray-800"><CardHeader className="pb-2"><CardDescription className="text-gray-400">Produtos Ativos</CardDescription><CardTitle className="text-3xl text-white">128</CardTitle></CardHeader></Card>
      <Card className="bg-[#1a1a1a] border-gray-800"><CardHeader className="pb-2"><CardDescription className="text-gray-400">Taxa Conversão</CardDescription><CardTitle className="text-3xl text-purple-400">12.5%</CardTitle></CardHeader></Card>
    </div>
  </div>
);


const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex">
      {/* Sidebar */}
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

        {/* Menu com Links */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <Link to={item.path} key={item.id}>
                <motion.div
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${location.pathname === item.path ? "bg-blue-500 text-white shadow-lg" : "text-gray-400 hover:text-white hover:bg-gray-800"}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && (<motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-medium">{item.title}</motion.span>)}
                </motion.div>
              </Link>
            ))}
          </div>
        </nav>
        
        {/* Seção de baixo */}
        <div className="p-4 border-t border-gray-800 space-y-2">
            <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white hover:bg-gray-800" onClick={() => setSidebarOpen(!sidebarOpen)}>
                {sidebarOpen ? <X className="w-5 h-5 mr-3" /> : <Menu className="w-5 h-5" />}
                {sidebarOpen && "Recolher"}
            </Button>
            {/* Outros botões de perfil e sair */}
        </div>
      </motion.div>

      {/* Área de Conteúdo Principal */}
      <div className="flex-1 flex flex-col">
        <header className="bg-[#1a1a1a] border-b border-gray-800 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">
                        {menuItems.find(item => item.path === location.pathname)?.title || "Página"}
                    </h1>
                    <p className="text-gray-400 mt-1">Gerencie suas vendas com inteligência</p>
                </div>
                <div className="flex items-center gap-4"><div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center"><User className="w-5 h-5 text-white" /></div></div>
            </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          <Outlet /> {/* O conteúdo da rota (DashboardContent ou SettingsPage) será renderizado aqui */}
        </main>
      </div>
    </div>
  );
};


// O componente final exportado é o Layout, e o conteúdo específico é o DashboardContent
// Isso será usado para compor as rotas em App.tsx
export { DashboardLayout, DashboardContent };