import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';

const Register = () => {
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
          <h2 className="font-serif text-xl font-semibold text-foreground mb-6 text-center">创建账号</h2>

          <form className="space-y-4" onSubmit={e => e.preventDefault()}>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">用户名</label>
              <Input type="text" placeholder="您的名字" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">邮箱地址</label>
              <Input type="email" placeholder="your@email.com" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">密码</label>
              <div className="relative">
                <Input type={showPassword ? 'text' : 'password'} placeholder="至少8位密码" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">确认密码</label>
              <Input type="password" placeholder="再次输入密码" />
            </div>

            <label className="flex items-start gap-2 text-sm text-muted-foreground">
              <input type="checkbox" className="rounded border-input mt-0.5" />
              <span>我已阅读并同意 <a href="#" className="text-primary hover:underline">服务条款</a> 和 <a href="#" className="text-primary hover:underline">隐私政策</a></span>
            </label>

            <Button type="submit" className="w-full font-serif text-base" size="lg">
              注册
            </Button>
          </form>

          <div className="vintage-divider my-6" />

          <p className="text-center text-sm text-muted-foreground">
            已有账号？{' '}
            <Link to="/login" className="text-primary font-medium hover:underline">立即登录</Link>
          </p>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          开启您的家族记忆之旅
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
