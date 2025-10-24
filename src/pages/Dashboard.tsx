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

      {/* Mobile Overlay - Sharp, no blur */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/80 z-[40] lg:hidden"
          />
        )}
      </AnimatePresence>

      <div className="relative z-[2] min-h-screen flex">
        {/* Sidebar - Fixed z-index and smooth animation */}
        <AnimatePresence mode="wait">
          <motion.aside
            initial={false}
            animate={{ 
              x: sidebarOpen ? 0 : -280,
              transition: { type: "spring", damping: 30, stiffness: 300 }
            }}
            className={`
              fixed lg:sticky top-0 left-0 h-screen w-[280px] 
              bg-card/95 backdrop-blur-xl border-r border-primary/20 
              z-[50] lg:z-[2] 
              overflow-y-auto overflow-x-hidden
              lg:translate-x-0
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}
            style={{
              boxShadow: '4px 0 40px hsl(var(--primary) / 0.15)',
              willChange: 'transform'
            }}
          >
            <div className="p-5 sm:p-6 space-y-6 sm:space-y-8">
              <div className="pb-4 sm:pb-6 border-b border-primary/10">
                <Logo showSubtitle={true} variant="full" />
              </div>

              {/* Domains */}
              <div>
                <h3 className="text-[0.65rem] sm:text-xs font-bold text-primary uppercase tracking-wider mb-3 sm:mb-4 px-2">
                  News Domains
                </h3>
                <div className="space-y-1.5 sm:space-y-2">
                  {domains.map((domain) => (
                    <motion.button
                      key={domain.id}
                      onClick={() => {
                        setActiveDomain(domain.id);
                        setSidebarOpen(false);
                      }}
                      whileHover={{ x: 4, transition: { duration: 0.2 } }}
                      whileTap={{ scale: 0.97 }}
                      className={`
                        w-full flex items-center justify-between p-2.5 sm:p-3 rounded-xl 
                        transition-all duration-200 cursor-pointer
                        ${activeDomain === domain.id
                          ? 'bg-primary/10 border-l-4 border-primary text-foreground'
                          : 'bg-muted/30 hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                        }
                      `}
                      style={{
                        boxShadow: activeDomain === domain.id 
                          ? '0 2px 15px hsl(var(--primary) / 0.2)' 
                          : 'none'
                      }}
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3 pointer-events-none">
                        <Newspaper className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors flex-shrink-0 ${activeDomain === domain.id ? 'text-primary' : 'text-current'}`} />
                        <span className="font-semibold text-xs sm:text-sm">{domain.name}</span>
                      </div>
                      <span className={`
                        text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full transition-colors flex-shrink-0
                        ${activeDomain === domain.id ? 'bg-primary/20 text-primary font-bold' : 'bg-muted text-muted-foreground'}
                      `}>
                        {domain.count}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-1.5 sm:space-y-2 pt-4 border-t border-primary/10">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2.5 sm:gap-3 h-9 sm:h-10 text-xs sm:text-sm border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all cursor-pointer"
                  onClick={() => setSidebarOpen(false)}
                >
                  <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Settings</span>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2.5 sm:gap-3 h-9 sm:h-10 text-xs sm:text-sm border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all cursor-pointer"
                  onClick={() => setSidebarOpen(false)}
                >
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Profile</span>
                </Button>
              </div>
            </div>
          </motion.aside>
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 w-full lg:w-[calc(100%-280px)] p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 sm:mb-8"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4 sm:mb-6">
              <div className="pl-12 lg:pl-0">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black gradient-text mb-1 sm:mb-2">
                  Your News Feed
                </h1>
                <p className="text-muted-foreground text-xs sm:text-sm lg:text-base">
                  Stay informed with AI-curated updates
                </p>
              </div>
              <Button 
                className="bg-gradient-to-br from-primary to-primary/80 text-background font-bold hover:shadow-lg hover:shadow-primary/50 transition-all hover-lift h-9 sm:h-10 text-sm"
                style={{ boxShadow: '0 4px 20px hsl(var(--primary) / 0.3)' }}
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 sm:mr-2" />
                <span className="hidden sm:inline">Notifications</span>
              </Button>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground pointer-events-none z-10" />
              <input
                type="text"
                placeholder="Search news articles..."
                className="
                  w-full h-10 sm:h-12 lg:h-14 pl-10 sm:pl-12 pr-4 sm:pr-6 
                  bg-card/80 backdrop-blur-xl rounded-xl 
                  border border-primary/20 
                  focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 
                  transition-all
                  text-xs sm:text-sm lg:text-base
                  text-foreground placeholder:text-muted-foreground
                "
                style={{ boxShadow: '0 2px 15px hsl(var(--primary) / 0.08)' }}
              />
            </div>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
            {[
              { label: "Articles Today", value: "24", icon: Newspaper, change: "+12%" },
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
                  className="bg-card/80 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border border-primary/15 transition-all hover:border-primary/40 hover:shadow-lg"
                  style={{ 
                    boxShadow: '0 2px 15px hsl(var(--primary) / 0.08)'
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-[0.7rem] sm:text-xs lg:text-sm text-muted-foreground mb-1 font-medium truncate">
                        {stat.label}
                      </p>
                      <p className="text-xl sm:text-2xl lg:text-3xl font-black text-foreground">
                        {stat.value}
                      </p>
                      <p className="text-[0.7rem] sm:text-xs text-primary mt-0.5 sm:mt-1 font-semibold">
                        {stat.change}
                      </p>
                    </div>
                    <div 
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ boxShadow: '0 2px 12px hsl(var(--primary) / 0.15)' }}
                    >
                      <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* News Articles */}
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-primary" />
              <span className="gradient-text">Latest Updates</span>
            </h2>

            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              {newsItems.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                >
                  <div 
                    className="bg-card/80 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 cursor-pointer border border-primary/15 transition-all hover:border-primary/40 hover:shadow-lg group"
                    style={{ 
                      boxShadow: '0 2px 15px hsl(var(--primary) / 0.08)'
                    }}
                  >
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 lg:gap-3 mb-2 sm:mb-3">
                          {article.trending && (
                            <span className="px-2 sm:px-2.5 lg:px-3 py-0.5 sm:py-1 bg-primary/20 text-primary text-[0.65rem] sm:text-xs font-bold rounded-full">
                              TRENDING
                            </span>
                          )}
                          <span className="text-[0.7rem] sm:text-xs lg:text-sm text-primary font-semibold">{article.domain}</span>
                          <span className="text-xs text-muted-foreground hidden sm:inline">•</span>
                          <span className="text-[0.65rem] sm:text-xs text-muted-foreground">{article.time}</span>
                        </div>

                        <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-1.5 sm:mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-xs sm:text-sm lg:text-base text-muted-foreground mb-3 sm:mb-4 line-clamp-2">
                          {article.summary}
                        </p>

                        <div className="flex items-center justify-between gap-3 sm:gap-4">
                          <span className="text-[0.7rem] sm:text-xs lg:text-sm text-muted-foreground truncate">
                            Source: {article.source}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-primary hover:text-primary hover:bg-primary/10 flex-shrink-0 transition-all h-7 sm:h-8 text-xs sm:text-sm"
                          >
                            <span className="hidden sm:inline">Read More</span>
                            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 sm:ml-1" />
                          </Button>
                        </div>
                      </div>

                      <div 
                        className="w-full sm:w-40 lg:w-48 h-24 sm:h-28 lg:h-32 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-primary/15 group-hover:to-primary/10 transition-all"
                        style={{ boxShadow: '0 2px 12px hsl(var(--primary) / 0.12)' }}
                      >
                        <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-primary" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Load More */}
          <div className="text-center mt-6 sm:mt-8 lg:mt-12 pb-6 sm:pb-8">
            <Button
              variant="outline"
              className="border-primary/20 hover:bg-primary/10 hover:border-primary/40 px-6 sm:px-8 h-9 sm:h-10 text-sm transition-all hover-lift"
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
