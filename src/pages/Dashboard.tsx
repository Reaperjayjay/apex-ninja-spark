import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Newspaper,
  TrendingUp,
  Clock,
  Settings as SettingsIcon,
  User,
  Bell,
  Search,
  ChevronRight,
  ExternalLink,
  Menu,
  LogOut,
  Briefcase,
  Brain,
  Bitcoin,
  TrendingDown,
  Code,
  GraduationCap,
  Music
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import newsData from "@/data/news.json";

interface NewsItem {
  id: string;
  title: string;
  snippet: string;
  source: string;
  category: string;
  time: string;
  url: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    setNews(newsData as NewsItem[]);
  }, [isLoggedIn, navigate]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Newspaper, path: '/dashboard' },
    { id: 'business', label: 'Business', icon: Briefcase, path: '/news/business' },
    { id: 'ai', label: 'AI', icon: Brain, path: '/news/ai' },
    { id: 'crypto', label: 'Crypto', icon: Bitcoin, path: '/news/crypto' },
    { id: 'forex', label: 'Forex', icon: TrendingDown, path: '/news/forex' },
    { id: 'tech', label: 'Tech', icon: Code, path: '/news/tech' },
    { id: 'education', label: 'Education', icon: GraduationCap, path: '/news/education' },
    { id: 'entertainment', label: 'Entertainment', icon: Music, path: '/news/entertainment' },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
    { id: 'settings', label: 'Settings', icon: SettingsIcon, path: '/settings' }
  ];

  const handleMenuClick = (path: string) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleArticleClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && sidebarOpen) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/40 z-30"
            />

            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 w-72 bg-white/6 backdrop-blur-xl border-r border-white/10 z-40 p-4 space-y-4 overflow-y-auto"
            >
              <div className="mb-6">
                <Logo variant="full" />
              </div>

              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.path)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-md hover:bg-white/10 transition-all text-left group"
                  >
                    <item.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-md hover:bg-destructive/10 hover:text-destructive transition-all text-left group"
                >
                  <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Logout</span>
                </button>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="relative z-[2] min-h-screen">
        <header className="sticky top-0 z-20 bg-card/95 backdrop-blur-xl border-b border-primary/20 px-6 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <motion.button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-md ring-2 ring-cyan-400/40 hover:ring-cyan-400/60 hover:scale-105 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  boxShadow: '0 0 20px rgba(0, 191, 255, 0.3), 0 0 40px rgba(0, 191, 255, 0.1)',
                  animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                }}
              >
                <Menu className="w-6 h-6 text-primary" />
              </motion.button>
              <Logo variant="compact" />
            </div>

            <Button
              className="bg-gradient-to-br from-primary to-primary/80 text-background font-bold hover:shadow-lg hover:shadow-primary/50 transition-all"
              style={{ boxShadow: '0 4px 20px hsl(var(--primary) / 0.3)' }}
            >
              <Bell className="w-5 h-5 sm:mr-2" />
              <span className="hidden sm:inline">Notifications</span>
            </Button>
          </div>
        </header>

        <main className="p-6 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <h1 className="text-3xl lg:text-4xl font-black gradient-text mb-2">
              Your News Feed
            </h1>
            <p className="text-muted-foreground">
              Stay informed with AI-curated updates
            </p>
          </motion.div>

          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none z-10" />
            <input
              type="text"
              placeholder="Search news articles..."
              className="w-full h-14 pl-12 pr-6 bg-card/80 backdrop-blur-xl rounded-xl border border-primary/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-muted-foreground"
              style={{ boxShadow: '0 2px 15px hsl(var(--primary) / 0.08)' }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              { label: "Articles Today", value: news.length.toString(), icon: Newspaper, change: "+12%" },
              { label: "Trending Topics", value: "8", icon: TrendingUp, change: "+3" },
              { label: "Read Time", value: "18m", icon: Clock, change: "avg" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div
                  className="bg-card/80 backdrop-blur-xl rounded-2xl p-6 border border-primary/15 transition-all hover:border-primary/40 hover:shadow-lg"
                  style={{ boxShadow: '0 2px 15px hsl(var(--primary) / 0.08)' }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground mb-1 font-medium">
                        {stat.label}
                      </p>
                      <p className="text-3xl font-black text-foreground">
                        {stat.value}
                      </p>
                      <p className="text-xs text-primary mt-1 font-semibold">
                        {stat.change}
                      </p>
                    </div>
                    <div
                      className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center"
                      style={{ boxShadow: '0 2px 12px hsl(var(--primary) / 0.15)' }}
                    >
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              <span className="gradient-text">Latest Updates</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
              >
                <Card
                  className="glass border-primary/15 cursor-pointer hover:border-primary/40 transition-all hover:shadow-lg group h-full"
                  onClick={() => handleArticleClick(article.url)}
                  style={{ boxShadow: '0 2px 15px hsl(var(--primary) / 0.08)' }}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2.5 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full">
                        {article.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{article.time}</span>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-3 mb-4">
                      {article.snippet}
                    </CardDescription>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{article.source}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:text-primary hover:bg-primary/10"
                      >
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="border-primary/20 hover:bg-primary/10 hover:border-primary/40 px-8"
            >
              Load More Articles
            </Button>
          </div>
        </main>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
