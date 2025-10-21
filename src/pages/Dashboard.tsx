import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Newspaper, 
  TrendingUp, 
  Clock, 
  Settings, 
  User, 
  Bell,
  Search,
  ChevronRight,
  ExternalLink,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

const Dashboard = () => {
  const [activeDomain, setActiveDomain] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const domains = [
    { id: "all", name: "All News", count: 24 },
    { id: "technology", name: "Technology", count: 8 },
    { id: "business", name: "Business", count: 5 },
    { id: "sports", name: "Sports", count: 6 },
    { id: "entertainment", name: "Entertainment", count: 5 },
  ];

  const newsItems = [
    {
      id: 1,
      title: "Breaking: Major AI Breakthrough in Language Models",
      source: "TechCrunch",
      domain: "Technology",
      time: "2 hours ago",
      summary: "Researchers announce significant advancement in AI language understanding...",
      trending: true
    },
    {
      id: 2,
      title: "Global Markets Surge on Economic Data",
      source: "Bloomberg",
      domain: "Business",
      time: "4 hours ago",
      summary: "Stock markets worldwide see positive movement following...",
      trending: true
    },
    {
      id: 3,
      title: "Championship Finals: Unexpected Victory",
      source: "ESPN",
      domain: "Sports",
      time: "5 hours ago",
      summary: "Underdog team clinches victory in stunning playoff finish...",
      trending: false
    },
    {
      id: 4,
      title: "New Climate Initiative Launched by Tech Giants",
      source: "Reuters",
      domain: "Technology",
      time: "6 hours ago",
      summary: "Major technology companies announce joint effort to combat...",
      trending: false
    },
  ];

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />

      {/* Mobile Menu Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-[100] lg:hidden border-primary/30 bg-card/95 backdrop-blur-xl hover:bg-primary/10"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[40] lg:hidden"
          />
        )}
      </AnimatePresence>

      <div className="relative z-[2] min-h-screen flex">
        {/* Sidebar */}
        <AnimatePresence>
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: sidebarOpen ? 0 : -280 }}
            className={`
              fixed lg:sticky top-0 left-0 h-screen w-[280px] 
              glass border-r border-primary/20 
              z-[50] lg:z-[2] 
              overflow-y-auto overflow-x-hidden
              transition-transform duration-300 ease-in-out
              lg:translate-x-0
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}
            style={{
              boxShadow: '0 0 40px rgba(0, 212, 255, 0.1)'
            }}
          >
            <div className="p-6 space-y-8">
              <div className="pb-6 border-b border-white/10">
                <Logo showSubtitle={false} />
              </div>

              {/* Domains */}
              <div>
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4 px-2">
                  News Domains
                </h3>
                <div className="space-y-2">
                  {domains.map((domain) => (
                    <motion.button
                      key={domain.id}
                      onClick={() => {
                        setActiveDomain(domain.id);
                        setSidebarOpen(false);
                      }}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        w-full flex items-center justify-between p-3 rounded-xl 
                        transition-all duration-200
                        ${activeDomain === domain.id
                          ? 'bg-gradient-to-br from-primary/20 to-secondary/20 border-l-4 border-primary shadow-lg shadow-primary/20'
                          : 'bg-white/5 hover:bg-white/10'
                        }
                      `}
                      style={{
                        boxShadow: activeDomain === domain.id 
                          ? '0 4px 20px rgba(0, 212, 255, 0.15)' 
                          : 'none'
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <Newspaper className={`w-5 h-5 transition-colors ${activeDomain === domain.id ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className="font-semibold text-sm">{domain.name}</span>
                      </div>
                      <span className={`
                        text-xs px-2.5 py-1 rounded-full transition-colors
                        ${activeDomain === domain.id ? 'bg-primary/20 text-primary font-bold' : 'bg-white/10 text-muted-foreground'}
                      `}>
                        {domain.count}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-4 border-t border-white/10">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all"
                >
                  <Settings className="w-5 h-5" />
                  Settings
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all"
                >
                  <User className="w-5 h-5" />
                  Profile
                </Button>
              </div>
            </div>
          </motion.aside>
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 w-full lg:w-[calc(100%-280px)] p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <div className="pl-12 lg:pl-0">
                <h1 className="text-3xl sm:text-4xl font-black gradient-text mb-2">
                  Your News Feed
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">Stay informed with AI-curated updates</p>
              </div>
              <Button 
                className="bg-gradient-to-br from-primary to-secondary text-black font-bold hover:shadow-lg hover:shadow-primary/50 transition-all hover-lift"
                style={{ boxShadow: '0 4px 15px rgba(0, 212, 255, 0.3)' }}
              >
                <Bell className="w-5 h-5 sm:mr-2" />
                <span className="hidden sm:inline">Notifications</span>
              </Button>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
              <input
                type="text"
                placeholder="Search news articles..."
                className="
                  w-full h-12 sm:h-14 pl-12 pr-6 
                  glass rounded-xl 
                  border border-primary/20 
                  focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 
                  transition-all
                  text-sm sm:text-base
                "
                style={{ boxShadow: '0 2px 10px rgba(0, 212, 255, 0.05)' }}
              />
            </div>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            {[
              { label: "Articles Today", value: "24", icon: Newspaper, change: "+12%" },
              { label: "Trending Topics", value: "8", icon: TrendingUp, change: "+3" },
              { label: "Read Time", value: "18m", icon: Clock, change: "avg" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div 
                  className="glass rounded-2xl p-5 sm:p-6 transition-all hover:border-primary/40"
                  style={{ 
                    boxShadow: '0 4px 20px rgba(0, 212, 255, 0.08)',
                    borderWidth: '1px'
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-1 font-medium">{stat.label}</p>
                      <p className="text-2xl sm:text-3xl font-black">{stat.value}</p>
                      <p className="text-xs text-accent mt-1 font-semibold">{stat.change}</p>
                    </div>
                    <div 
                      className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center"
                      style={{ boxShadow: '0 2px 10px rgba(0, 212, 255, 0.2)' }}
                    >
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* News Articles */}
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <TrendingUp className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
              Latest Updates
            </h2>

            <div className="space-y-4 sm:space-y-6">
              {newsItems.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                >
                  <div 
                    className="glass rounded-2xl p-5 sm:p-6 cursor-pointer transition-all hover:border-primary/40 group"
                    style={{ 
                      boxShadow: '0 4px 20px rgba(0, 212, 255, 0.08)',
                      borderWidth: '1px'
                    }}
                  >
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                          {article.trending && (
                            <span className="px-2.5 sm:px-3 py-1 bg-accent/20 text-accent text-xs font-bold rounded-full">
                              TRENDING
                            </span>
                          )}
                          <span className="text-xs sm:text-sm text-primary font-semibold">{article.domain}</span>
                          <span className="text-xs text-muted-foreground hidden sm:inline">•</span>
                          <span className="text-xs text-muted-foreground">{article.time}</span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-sm sm:text-base text-muted-foreground mb-4 line-clamp-2">{article.summary}</p>

                        <div className="flex items-center justify-between gap-4">
                          <span className="text-xs sm:text-sm text-muted-foreground truncate">Source: {article.source}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-primary hover:text-primary hover:bg-primary/10 flex-shrink-0 transition-all"
                          >
                            <span className="hidden sm:inline">Read More</span>
                            <ChevronRight className="w-4 h-4 sm:ml-1" />
                          </Button>
                        </div>
                      </div>

                      <div 
                        className="w-full sm:w-48 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ boxShadow: '0 2px 15px rgba(0, 212, 255, 0.15)' }}
                      >
                        <ExternalLink className="w-6 sm:w-8 h-6 sm:h-8 text-primary" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Load More */}
          <div className="text-center mt-8 sm:mt-12 pb-8">
            <Button
              variant="outline"
              className="border-primary/20 hover:bg-primary/10 hover:border-primary/40 px-8 transition-all hover-lift"
            >
              Load More Articles
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
