// src/App.tsx (VERSÃO FINAL)

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/providers/AuthProvider";
import ProtectedRoute from "@/components/ProtectedRoute";

import Index from "./pages/Index";
import { DashboardLayout, DashboardContent } from "./pages/Dashboard"; // Importamos os dois
import Login from "./pages/Login";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            
            {/* Rotas Protegidas agora usam o Layout do Dashboard */}
            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}> {/* "Casca" do dashboard */}
                <Route path="/dashboard" element={<DashboardContent />} /> {/* Rota principal do dash */}
                <Route path="/settings" element={<SettingsPage />} /> {/* Rota de configurações */}
                {/* Futuramente, outras rotas como /dashboard/chat podem vir aqui */}
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </AuthProvider>
);

export default App;