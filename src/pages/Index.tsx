import { Link } from 'react-router-dom';
import { Camera, Users, TreePine, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const features = [
  { icon: Camera, title: '照片管理', desc: '收集珍贵的家庭照片，让每一刻都被铭记' },
  { icon: Users, title: '人脸识别', desc: '自动识别家庭成员，让照片整理更轻松' },
  { icon: TreePine, title: '家谱树', desc: '可视化家族关系，传承血脉纽带' },
  { icon: BookOpen, title: '人生故事', desc: '记录每位家人的故事，留住岁月的温度' },
];

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-primary mb-4">
              家族记忆
            </h1>
            <p className="text-muted-foreground tracking-[0.3em] text-sm mb-6">HERITREE</p>
            <p className="text-lg md:text-xl text-foreground/70 max-w-lg mx-auto mb-10 leading-relaxed">
              翻开泛黄的相册，每一张照片都是一段温暖的故事。<br />
              让我们一起守护这份珍贵的家族记忆。
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg" className="font-serif text-base px-8">
                <Link to="/families">开始探索</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-serif text-base px-8">
                <Link to="/photos">浏览照片</Link>
              </Button>
            </div>
          </motion.div>
        </div>
        {/* Decorative divider */}
        <div className="vintage-divider mt-20 mx-auto max-w-md" />
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="paper-card p-8 text-center hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-secondary mb-5">
                <f.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
