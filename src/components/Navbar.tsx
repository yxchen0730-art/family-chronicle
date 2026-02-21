import { Link, useLocation } from 'react-router-dom';
import { Camera, Users, TreePine, Clock, Home, Menu, X, LogIn } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { path: '/', label: '首页', icon: Home },
  { path: '/families', label: '家庭空间', icon: Users },
  { path: '/photos', label: '照片管理', icon: Camera },
  { path: '/timeline', label: '时间轴', icon: Clock },
  { path: '/people', label: '人物档案', icon: Users },
  { path: '/family-tree', label: '家谱树', icon: TreePine },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-serif text-2xl font-bold text-primary">家族记忆</span>
          <span className="text-xs text-muted-foreground tracking-widest">HERITREE</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                location.pathname === item.path
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/70 hover:text-foreground hover:bg-secondary"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
          <div className="ml-2 pl-2 border-l border-border">
            <Button asChild variant="ghost" size="sm" className="font-serif">
              <Link to="/login"><LogIn className="h-4 w-4 mr-1" />登录</Link>
            </Button>
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card px-4 pb-4">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-2 px-3 py-3 rounded-lg text-sm font-medium transition-colors",
                location.pathname === item.path
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/70 hover:bg-secondary"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
          <div className="vintage-divider my-2" />
          <Link
            to="/login"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 px-3 py-3 rounded-lg text-sm font-medium text-primary hover:bg-secondary"
          >
            <LogIn className="h-4 w-4" />
            登录 / 注册
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
