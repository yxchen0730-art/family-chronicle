import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-bold text-primary mb-2">家族记忆</h1>
          <p className="text-muted-foreground tracking-[0.2em] text-xs">HERITREE</p>
        </div>

        <div className="paper-card p-8 border-2 border-border">
          <h2 className="font-serif text-xl font-semibold text-foreground mb-6 text-center">欢迎回来</h2>

          <form className="space-y-4" onSubmit={e => e.preventDefault()}>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">邮箱地址</label>
              <Input type="email" placeholder="your@email.com" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">密码</label>
              <div className="relative">
                <Input type={showPassword ? 'text' : 'password'} placeholder="输入密码" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted-foreground">
                <input type="checkbox" className="rounded border-input" />
                记住我
              </label>
              <a href="#" className="text-primary hover:underline">忘记密码？</a>
            </div>

            <Button type="submit" className="w-full font-serif text-base" size="lg">
              登录
            </Button>
          </form>

          <div className="vintage-divider my-6" />

          <p className="text-center text-sm text-muted-foreground">
            还没有账号？{' '}
            <Link to="/register" className="text-primary font-medium hover:underline">立即注册</Link>
          </p>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          守护每一份珍贵的家族记忆
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
