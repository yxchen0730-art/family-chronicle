import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const CreateFamily = () => {
  return (
    <div className="container mx-auto px-4 py-10 max-w-lg">
      <Link to="/families" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" />返回家庭列表
      </Link>

      <div className="paper-card p-8">
        <h1 className="font-serif text-2xl font-bold text-foreground mb-6">创建家庭空间</h1>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">家庭名称</label>
            <Input placeholder="例如：张氏家族" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">家庭描述</label>
            <Textarea placeholder="简单介绍一下你的家庭..." rows={4} />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">封面图片</label>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center text-muted-foreground hover:border-primary/50 transition-colors cursor-pointer">
              <p className="text-sm">点击上传或拖拽图片到此处</p>
            </div>
          </div>
          <Button className="w-full font-serif">创建家庭</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateFamily;
