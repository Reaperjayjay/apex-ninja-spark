import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  showSubtitle?: boolean;
  className?: string;
}

export const Logo = ({ showSubtitle = true, className }: LogoProps) => {
  return (
    <Link to="/" className={cn("flex items-center gap-3", className)}>
      <div 
        className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-2xl"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))',
          boxShadow: '0 0 20px hsl(var(--primary) / 0.5)'
        }}
      >
        A
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-extrabold tracking-wide">APEX NEWS NINJA</span>
        {showSubtitle && (
          <span className="text-[0.7rem] text-muted-foreground">AI-Powered News</span>
        )}
      </div>
    </Link>
  );
};
