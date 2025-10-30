import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Logo } from "@/components/Logo";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ExternalLink, ArrowLeft, ChevronRight } from "lucide-react";
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

const NewsCategory = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const categoryName = category?.charAt(0).toUpperCase() + category?.slice(1);
    const filtered = (newsData as NewsItem[]).filter(
      item => item.category.toLowerCase() === category?.toLowerCase()
    );
    setNews(filtered);
  }, [category]);

  const handleArticleClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen">
      <AnimatedBackground />

      <div className="relative z-10 min-h-screen px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <Logo variant="full" />
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard')}
              className="border-primary/20 hover:bg-primary/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <button onClick={() => navigate('/dashboard')} className="hover:text-primary transition-colors">
                  Dashboard
                </button>
                <ChevronRight className="w-4 h-4" />
                <span className="text-foreground font-semibold capitalize">{category}</span>
              </nav>

              <h1 className="text-3xl md:text-4xl font-black gradient-text mb-2 capitalize">
                {category} News
              </h1>
              <p className="text-muted-foreground">
                Latest updates in {category?.toLowerCase()}
              </p>
            </div>

            {news.length === 0 ? (
              <GlassCard className="text-center py-12">
                <p className="text-xl text-muted-foreground mb-4">No news available in this category yet.</p>
                <Button onClick={() => navigate('/dashboard')} variant="outline" className="border-primary/20">
                  Browse All News
                </Button>
              </GlassCard>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
                    <Card
                      className="glass border-primary/15 cursor-pointer hover:border-primary/40 transition-all hover:shadow-lg group h-full"
                      onClick={() => handleArticleClick(item.url)}
                      style={{ boxShadow: '0 2px 15px hsl(var(--primary) / 0.08)' }}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <span className="px-2.5 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full">
                            {item.category}
                          </span>
                          <span className="text-xs text-muted-foreground">{item.time}</span>
                        </div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="line-clamp-3 mb-4">
                          {item.snippet}
                        </CardDescription>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{item.source}</span>
                          <ExternalLink className="w-4 h-4 text-primary" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NewsCategory;
