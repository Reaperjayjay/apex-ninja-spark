import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Brain, Zap, Target, Mail, Lock, User } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Intelligence",
      description: "Advanced algorithms curate the most relevant news for you"
    },
    {
      icon: Zap,
      title: "Instant Delivery",
      description: "Get your personalized digest directly on WhatsApp in seconds"
    },
    {
      icon: Target,
      title: "Precision Targeting",
      description: "Choose from 15+ domains to match your exact interests"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add authentication logic
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      
      <div className="relative z-10 min-h-screen grid lg:grid-cols-2">
        {/* Left Panel - Features */}
        <div className="hidden lg:flex flex-col justify-center p-12 lg:p-16 xl:p-20 relative">
          <div className="absolute top-8 lg:top-12 left-8 lg:left-12 xl:left-20">
            <Logo variant="full" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black mb-8 lg:mb-12 gradient-text leading-tight">
              Your Personal News Revolution Starts Here
            </h1>

            <div className="space-y-6 lg:space-y-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex gap-4 lg:gap-6 items-start p-4 lg:p-6 bg-card/80 backdrop-blur-xl border border-primary/15 rounded-xl lg:rounded-2xl hover:bg-primary/10 hover:border-primary/30 transition-all"
                >
                  <div 
                    className="w-12 h-12 lg:w-14 lg:h-14 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--secondary) / 0.2))',
                      border: '2px solid hsl(var(--primary) / 0.3)',
                      boxShadow: '0 2px 12px hsl(var(--primary) / 0.15)'
                    }}
                  >
                    <feature.icon className="w-6 h-6 lg:w-7 lg:h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg lg:text-xl font-bold mb-1 lg:mb-2">{feature.title}</h3>
                    <p className="text-sm lg:text-base text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Panel - Auth Form */}
        <div className="flex items-center justify-center p-6 sm:p-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-md"
          >
            <div className="bg-card/90 backdrop-blur-xl border border-primary/15 rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10">
              <div className="lg:hidden mb-6 sm:mb-8 flex justify-center">
                <Logo showSubtitle={true} variant="full" />
              </div>

              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-black mb-2">
                  {isLogin ? "Welcome Back" : "Create Account"}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {isLogin 
                    ? "Enter your credentials to access your dashboard"
                    : "Join thousands of users staying informed daily"
                  }
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground pointer-events-none" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        className="pl-10 sm:pl-11 h-10 sm:h-12 bg-background/50 border-primary/20 focus:border-primary text-sm sm:text-base"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground pointer-events-none" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10 sm:pl-11 h-10 sm:h-12 bg-background/50 border-primary/20 focus:border-primary text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground pointer-events-none" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 sm:pl-11 h-10 sm:h-12 bg-background/50 border-primary/20 focus:border-primary text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>

                {isLogin && (
                  <div className="flex justify-end">
                    <button type="button" className="text-xs sm:text-sm text-primary hover:underline transition-all">
                      Forgot password?
                    </button>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-10 sm:h-12 bg-gradient-to-br from-primary to-primary/80 text-background font-bold text-sm sm:text-base hover:shadow-lg hover:shadow-primary/50 transition-all"
                  style={{ boxShadow: '0 4px 20px hsl(var(--primary) / 0.3)' }}
                >
                  {isLogin ? "Sign In" : "Create Account"}
                </Button>
              </form>

              <div className="mt-6 sm:mt-8">
                <div className="relative">
                  <Separator className="my-4 sm:my-6" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-card px-4 text-xs sm:text-sm text-muted-foreground">OR</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full h-10 sm:h-12 border-primary/20 hover:bg-primary/10 hover:border-primary/30 font-semibold text-sm sm:text-base transition-all"
                  type="button"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Continue with Google</span>
                </Button>
              </div>

              <p className="text-center text-xs sm:text-sm text-muted-foreground mt-4 sm:mt-6">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary font-semibold hover:underline transition-all"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
