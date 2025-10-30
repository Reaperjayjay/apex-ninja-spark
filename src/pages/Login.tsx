import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, FormEvent } from "react";
import { Mail, Lock, Phone } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+234");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validatePassword = (pwd: string): boolean => {
    const minLength = pwd.length >= 8;
    const hasUpperCase = /[A-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);

    if (!minLength) {
      setErrors(prev => ({ ...prev, password: "Password must be at least 8 characters" }));
      return false;
    }
    if (!hasUpperCase) {
      setErrors(prev => ({ ...prev, password: "Password must contain at least one uppercase letter" }));
      return false;
    }
    if (!hasNumber) {
      setErrors(prev => ({ ...prev, password: "Password must contain at least one number" }));
      return false;
    }
    if (!hasSpecialChar) {
      setErrors(prev => ({ ...prev, password: "Password must contain at least one special character" }));
      return false;
    }

    setErrors(prev => ({ ...prev, password: "" }));
    return true;
  };

  const validatePhone = (phoneNum: string): boolean => {
    const digitsOnly = phoneNum.replace(/\D/g, '');

    if (digitsOnly.length < 10 || digitsOnly.length > 11) {
      setErrors(prev => ({ ...prev, phone: "Phone number must be 10-11 digits" }));
      return false;
    }

    setErrors(prev => ({ ...prev, phone: "" }));
    return true;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const isPasswordValid = validatePassword(password);
    const isPhoneValid = validatePhone(phone);

    if (!email) {
      setErrors(prev => ({ ...prev, email: "Email is required" }));
      return;
    }

    if (isPasswordValid && isPhoneValid && email) {
      login();
      toast.success("Login successful!");
      navigate('/niches');
    }
  };

  const handleGoogleLogin = () => {
    toast.info("Google OAuth integration coming soon!");
  };

  return (
    <div className="min-h-screen">
      <AnimatedBackground />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="mb-8 flex justify-center">
            <Logo variant="full" />
          </div>

          <Card className="glass border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-black gradient-text">Welcome Back</CardTitle>
              <CardDescription>Sign in to access your personalized news feed</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6" role="form">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-11 h-12 bg-background/50 border-primary/20 focus:border-primary"
                      aria-label="Email address"
                      required
                    />
                  </div>
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-semibold">Phone Number</Label>
                  <div className="flex gap-2">
                    <Select value={countryCode} onValueChange={setCountryCode}>
                      <SelectTrigger className="w-32 h-12 bg-background/50 border-primary/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="+234">🇳🇬 +234</SelectItem>
                        <SelectItem value="+1">🇺🇸 +1</SelectItem>
                        <SelectItem value="+44">🇬🇧 +44</SelectItem>
                        <SelectItem value="+91">🇮🇳 +91</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="relative flex-1">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="8012345678"
                        value={phone}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          setPhone(value);
                          if (value.length > 0) validatePhone(value);
                        }}
                        className="pl-11 h-12 bg-background/50 border-primary/20 focus:border-primary"
                        aria-label="Phone number"
                        required
                      />
                    </div>
                  </div>
                  {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (e.target.value.length > 0) validatePassword(e.target.value);
                      }}
                      className="pl-11 h-12 bg-background/50 border-primary/20 focus:border-primary"
                      aria-label="Password"
                      required
                    />
                  </div>
                  {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                  <p className="text-xs text-muted-foreground">
                    Min 8 characters, 1 uppercase, 1 number, 1 special character
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-br from-primary to-primary/80 text-background font-bold hover:shadow-lg hover:shadow-primary/50 transition-all"
                  style={{ boxShadow: '0 4px 20px hsl(var(--primary) / 0.3)' }}
                >
                  Sign In
                </Button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-primary/20" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={handleGoogleLogin}
                  variant="outline"
                  className="w-full h-12 mt-4 border-primary/20 hover:bg-primary/10 hover:border-primary/30 font-semibold transition-all"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </Button>
              </div>

              <p className="text-center text-sm text-muted-foreground mt-6">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate('/auth')}
                  className="text-primary font-semibold hover:underline transition-all"
                >
                  Sign up
                </button>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
