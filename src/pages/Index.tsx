import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Settings, MessageSquare, Calculator, Network, Search, BarChart3, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const updateScrollY = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", updateScrollY);
    return () => window.removeEventListener("scroll", updateScrollY);
  }, []);

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white overflow-x-hidden">
      {/* Fixed Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-blue-100"
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
            >
              <Settings className="h-8 w-8 text-blue-400" />
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-900">Hub de Ferramentas</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-gray-700 hover:text-blue-600"
              onClick={() => navigate('/dashboard')}
            >
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                className="bg-blue-400 hover:bg-blue-500 text-white rounded-2xl px-6"
                onClick={() => navigate('/dashboard')}
              >
                Criar Conta
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        style={{ opacity: heroOpacity, y: heroY }}
        className="h-screen flex items-center justify-center relative overflow-hidden"
      >
        {/* Floating Elements */}
        <motion.div
          animate={{ 
            y: [-20, 20, -20],
            rotate: [0, 5, 0],
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-20 w-32 h-32 bg-blue-100 rounded-3xl opacity-30"
        />
        <motion.div
          animate={{ 
            y: [20, -20, 20],
            rotate: [0, -5, 0],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-32 right-32 w-24 h-24 bg-blue-200 rounded-full opacity-40"
        />
        <motion.div
          animate={{ 
            y: [-30, 30, -30],
            x: [-10, 10, -10],
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 right-20 w-16 h-16 bg-blue-300 rounded-2xl opacity-25"
        />

        <div className="text-center z-10 px-6 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Venda com <span className="text-blue-400">Inteligência</span>.
            <br />
            Automatize com <span className="text-blue-400">Estilo</span>.
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
          >
            Um sistema completo para quem vive do Mercado Livre.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button 
              className="bg-blue-400 hover:bg-blue-500 text-white text-xl px-12 py-4 rounded-3xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => navigate('/dashboard')}
            >
              Comece Agora
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-16 flex flex-col items-center"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="h-8 w-8 text-blue-400 mb-2" />
            </motion.div>
            <p className="text-gray-500 text-sm">Desça e descubra</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Tool Sections */}
      <ToolSection
        icon={<MessageSquare className="h-16 w-16 text-blue-400" />}
        title="Respostas Automáticas com IA"
        description="Receba as perguntas dos seus anúncios e responda automaticamente com inteligência artificial treinada. Personalize o tom, revise antes de enviar ou ative envio automático. Menos tempo com atendimento, mais foco nas vendas."
        mockup={<ChatMockup />}
        reverse={false}
      />

      <ToolSection
        icon={<Calculator className="h-16 w-16 text-blue-400" />}
        title="Calculadora de Lucro Multi-Marketplace"
        description="Descubra exatamente quanto cobrar para manter sua margem de lucro. Insira o custo e a margem desejada e veja o valor ideal para Mercado Livre, Shopee, Amazon e mais. Inclui cálculo automático das taxas."
        mockup={<CalculatorMockup />}
        reverse={true}
      />

      <ToolSection
        icon={<Network className="h-16 w-16 text-blue-400" />}
        title="Estoque Compartilhado"
        description="Venda um item em um anúncio e o estoque é automaticamente sincronizado em todos os outros anúncios do mesmo produto. Evite vendas duplicadas e melhore a gestão do seu inventário."
        mockup={<NetworkMockup />}
        reverse={false}
      />

      <ToolSection
        icon={<Search className="h-16 w-16 text-blue-400" />}
        title="Otimizador de Anúncios e SEO"
        description="Cole o título e a descrição de um produto e veja sugestões geradas por IA para melhorar seu SEO, atrair mais cliques e aumentar suas conversões. Texto otimizado com apenas 1 clique."
        mockup={<SEOMockup />}
        reverse={true}
      />

      <ToolSection
        icon={<BarChart3 className="h-16 w-16 text-blue-400" />}
        title="Dashboard Inteligente"
        description="Tenha uma visão clara da sua operação. O painel inicial do Hub de Ferramentas traz os dados que mais importam para você agir rápido e vender mais."
        mockup={<DashboardMockup />}
        reverse={false}
        featured={true}
      />

      {/* Footer */}
      <footer className="bg-blue-50 py-16 mt-32">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Sobre o projeto</h3>
              <p className="text-gray-600">
                Hub de Ferramentas é a plataforma completa para vendedores do Mercado Livre que querem automatizar processos e vender mais.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Links rápidos</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Funcionalidades</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Redes sociais</h3>
              <div className="space-y-2 text-gray-600">
                <p><a href="#" className="hover:text-blue-400 transition-colors">Instagram</a></p>
                <p><a href="#" className="hover:text-blue-400 transition-colors">LinkedIn</a></p>
                <p><a href="#" className="hover:text-blue-400 transition-colors">Política de Privacidade</a></p>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-200 mt-12 pt-8 text-center text-gray-500">
            <p>© 2025 Hub de Ferramentas. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Tool Section Component
const ToolSection = ({ icon, title, description, mockup, reverse, featured }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  mockup: React.ReactNode;
  reverse: boolean;
  featured?: boolean;
}) => {
  return (
    <section className={`min-h-screen flex items-center py-32 ${featured ? 'bg-gradient-to-br from-blue-50 to-white' : ''}`}>
      <div className="container mx-auto px-6">
        <div className={`grid lg:grid-cols-2 gap-16 items-center ${reverse ? 'lg:grid-flow-col-dense' : ''}`}>
          <motion.div
            initial={{ opacity: 0, x: reverse ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={reverse ? 'lg:col-start-2' : ''}
          >
            <div className="flex items-center mb-8">
              {icon}
              <h2 className="text-4xl font-bold text-gray-900 ml-4">{title}</h2>
            </div>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {description}
            </p>
            <Button className="bg-blue-400 hover:bg-blue-500 text-white px-8 py-3 rounded-2xl">
              Saiba mais
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: reverse ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className={reverse ? 'lg:col-start-1' : ''}
          >
            {mockup}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Mockup Components
const ChatMockup = () => (
  <Card className="p-8 bg-white rounded-3xl shadow-lg">
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-100 rounded-2xl p-4 text-sm"
      >
        "Qual o prazo de entrega?"
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-blue-400 text-white rounded-2xl p-4 text-sm ml-8"
      >
        "Olá! O prazo de entrega é de 3-5 dias úteis. Enviamos no mesmo dia para compras até 15h!"
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="bg-gray-100 rounded-2xl p-4 text-sm"
      >
        "Tem garantia?"
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="bg-blue-400 text-white rounded-2xl p-4 text-sm ml-8"
      >
        "Sim! Oferecemos 12 meses de garantia. Qualquer problema, trocamos sem complicação!"
      </motion.div>
    </div>
  </Card>
);

const CalculatorMockup = () => (
  <Card className="p-8 bg-white rounded-3xl shadow-lg">
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-600">Custo do produto</label>
          <div className="bg-gray-100 rounded-xl p-3 text-lg font-semibold">R$ 50,00</div>
        </div>
        <div>
          <label className="text-sm text-gray-600">Margem desejada</label>
          <div className="bg-gray-100 rounded-xl p-3 text-lg font-semibold">40%</div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-blue-50 rounded-2xl p-6"
      >
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-600">Mercado Livre</p>
            <p className="text-2xl font-bold text-blue-600">R$ 89,90</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Shopee</p>
            <p className="text-2xl font-bold text-blue-600">R$ 85,50</p>
          </div>
        </div>
      </motion.div>
    </div>
  </Card>
);

const NetworkMockup = () => (
  <div className="relative">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="grid grid-cols-2 gap-4"
    >
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="p-4 bg-white rounded-2xl shadow-lg">
          <div className="bg-gray-100 rounded-xl h-20 mb-3"></div>
          <p className="text-sm font-semibold">Produto {i}</p>
          <p className="text-xs text-gray-600">Estoque: 15 unidades</p>
        </Card>
      ))}
    </motion.div>
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <div className="w-full h-full relative">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <motion.line
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            x1="25" y1="25" x2="75" y2="75"
            stroke="#60A5FA" strokeWidth="2" strokeDasharray="5,5"
          />
          <motion.line
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 1 }}
            x1="75" y1="25" x2="25" y2="75"
            stroke="#60A5FA" strokeWidth="2" strokeDasharray="5,5"
          />
        </svg>
      </div>
    </motion.div>
  </div>
);

const SEOMockup = () => (
  <Card className="p-8 bg-white rounded-3xl shadow-lg">
    <div className="space-y-6">
      <div>
        <label className="text-sm text-gray-600">Título atual</label>
        <div className="bg-gray-100 rounded-xl p-3 text-sm">Smartphone Android Novo</div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <label className="text-sm text-green-600 font-semibold">Título otimizado</label>
        <div className="bg-green-50 rounded-xl p-3 text-sm border-2 border-green-200">
          Smartphone Android 128GB Câmera 48MP Tela 6.1" Dual Chip 5G Novo Lacrado
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        className="flex items-center justify-between bg-blue-50 rounded-xl p-4"
      >
        <span className="text-sm text-blue-600">Score SEO</span>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-3 h-6 bg-blue-400 rounded-sm"></div>
          ))}
        </div>
      </motion.div>
    </div>
  </Card>
);

const DashboardMockup = () => (
  <Card className="p-8 bg-white rounded-3xl shadow-xl">
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-green-50 rounded-2xl p-4"
        >
          <p className="text-sm text-green-600">Vendas hoje</p>
          <p className="text-3xl font-bold text-green-700">R$ 2.847</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-blue-50 rounded-2xl p-4"
        >
          <p className="text-sm text-blue-600">Perguntas respondidas</p>
          <p className="text-3xl font-bold text-blue-700">47</p>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-orange-50 rounded-2xl p-4"
      >
        <p className="text-sm text-orange-600">⚠️ Anúncios sem estoque</p>
        <p className="text-lg font-semibold text-orange-700">3 produtos precisam de atenção</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-gray-50 rounded-2xl p-4 h-32 flex items-end"
      >
        <div className="flex items-end space-x-2 w-full justify-between">
          {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${height}%` }}
              transition={{ delay: 1 + i * 0.1 }}
              className="bg-blue-400 rounded-t-lg flex-1"
            />
          ))}
        </div>
      </motion.div>
    </div>
  </Card>
);

export default Index;
