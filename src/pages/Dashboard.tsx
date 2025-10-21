import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Logo } from "@/components/Logo";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  Newspaper, 
  TrendingUp, 
  Clock, 
  Settings, 
  User, 
  Bell,
  Search,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { useState } from "react";

const Dashboard = () => {
  const [activeDomain, setActiveDomain] = useState("all");

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
    <div className="min-h-screen">
      <AnimatedBackground />

      <div className="relative z-10 min-h-screen grid lg:grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <aside className="glass border-r border-primary/20 p-6 h-screen fixed w-[280px] overflow-y-auto">
          <Logo showSubtitle={false} className="mb-10 pb-8 border-b border-white/10" />

          {/* Domains */}
          <div className="mb-8">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
              News Domains
            </h3>
            <div className="space-y-2">
              {domains.map((domain) => (
                <button
                  key={domain.id}
                  onClick={() => setActiveDomain(domain.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                    activeDomain === domain.id
                      ? 'bg-gradient-to-br from-primary/20 to-secondary/20 border-l-4 border-primary shadow-lg shadow-primary/20'
                      : 'bg-white/5 hover:bg-white/10 hover:translate-x-1'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Newspaper className={`w-5 h-5 ${activeDomain === domain.id ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className="font-semibold text-sm">{domain.name}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    activeDomain === domain.id ? 'bg-primary/20 text-primary' : 'bg-white/10 text-muted-foreground'
                  }`}>
                    {domain.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start gap-3 border-primary/20 hover:bg-primary/10"
            >
              <Settings className="w-5 h-5" />
              Settings
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-3 border-primary/20 hover:bg-primary/10"
            >
              <User className="w-5 h-5" />
              Profile
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:ml-[280px] p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-4xl font-black gradient-text mb-2">
                  Your News Feed
                </h1>
                <p className="text-muted-foreground">Stay informed with AI-curated updates</p>
              </div>
              <Button className="bg-gradient-to-br from-primary to-secondary text-black font-bold hover:shadow-lg hover:shadow-primary/50">
                <Bell className="w-5 h-5 mr-2" />
                Notifications
              </Button>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search news articles..."
                className="w-full h-14 pl-12 pr-6 glass rounded-xl border border-primary/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
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
              >
                <GlassCard>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-3xl font-black">{stat.value}</p>
                      <p className="text-xs text-accent mt-1">{stat.change}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* News Articles */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              Latest Updates
            </h2>

            {newsItems.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="hover:scale-[1.01] cursor-pointer">
                  <div className="flex gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        {article.trending && (
                          <span className="px-3 py-1 bg-accent/20 text-accent text-xs font-bold rounded-full">
                            TRENDING
                          </span>
                        )}
                        <span className="text-sm text-primary font-semibold">{article.domain}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{article.time}</span>
                      </div>

                      <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">{article.summary}</p>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Source: {article.source}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:text-primary hover:bg-primary/10"
                        >
                          Read More
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>

                    <div className="w-48 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <ExternalLink className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="border-primary/20 hover:bg-primary/10 px-8"
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
