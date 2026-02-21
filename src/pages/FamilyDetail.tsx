import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Edit3, Users, Camera, Calendar, MapPin, Save, X, Plus, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { families, people, photos } from '@/data/mockData';

const FamilyDetail = () => {
  const { id } = useParams();
  const family = families.find(f => f.id === id);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(family?.name || '');
  const [editDesc, setEditDesc] = useState(family?.description || '');

  if (!family) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">未找到该家庭</p>
        <Button asChild variant="outline" className="mt-4">
          <Link to="/families">返回家庭列表</Link>
        </Button>
      </div>
    );
  }

  const familyMembers = people.slice(0, family.memberCount > 6 ? 6 : family.memberCount);
  const familyPhotos = photos.slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-10">
      <Link to="/families" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" />返回家庭列表
      </Link>

      {/* Cover & Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="paper-card overflow-hidden mb-8"
      >
        <div className="aspect-[21/9] overflow-hidden relative">
          <img src={family.coverUrl} alt={family.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground">
            <h1 className="font-serif text-3xl font-bold mb-1">{family.name}</h1>
            <p className="text-primary-foreground/80 text-sm">{family.description}</p>
          </div>
        </div>
        <div className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Users className="h-4 w-4" />{family.memberCount} 位成员</span>
            <span className="flex items-center gap-1.5"><Camera className="h-4 w-4" />{family.photoCount} 张照片</span>
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />创建于 {family.createdAt}</span>
          </div>
          <Button variant="outline" size="sm" onClick={() => { setEditName(family.name); setEditDesc(family.description); setIsEditing(true); }}>
            <Edit3 className="h-3.5 w-3.5 mr-1" />编辑信息
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Members */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="paper-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-lg font-semibold text-foreground">家庭成员</h2>
              <Button variant="ghost" size="sm"><UserPlus className="h-3.5 w-3.5 mr-1" />添加</Button>
            </div>
            <div className="space-y-3">
              {familyMembers.map((person) => (
                <Link
                  key={person.id}
                  to={`/people/${person.id}`}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium text-primary-foreground ${person.gender === '男' ? 'bg-primary' : 'bg-accent'}`}>
                    {person.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{person.name}</p>
                    <p className="text-xs text-muted-foreground">{person.relation}{person.birthYear ? ` · ${person.birthYear}年` : ''}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Photos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="paper-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-lg font-semibold text-foreground">家庭照片</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/photos"><Camera className="h-3.5 w-3.5 mr-1" />查看全部</Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {familyPhotos.map((photo) => (
                <Link key={photo.id} to={`/photos/${photo.id}`} className="group">
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <img src={photo.url} alt={photo.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5 truncate">{photo.title} · {photo.year}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="paper-card p-5 mt-6">
            <h2 className="font-serif text-lg font-semibold text-foreground mb-4">家庭动态</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>📷 最近上传了 <span className="text-foreground font-medium">3</span> 张新照片</p>
              <p>👤 <span className="text-foreground font-medium">张小明</span> 更新了个人资料</p>
              <p>💬 <span className="text-foreground font-medium">张小丽</span> 评论了一张照片</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif">编辑家庭信息</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">家庭名称</label>
              <Input value={editName} onChange={e => setEditName(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">家庭描述</label>
              <Textarea value={editDesc} onChange={e => setEditDesc(e.target.value)} rows={3} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">封面图片</label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center text-muted-foreground hover:border-primary/50 transition-colors cursor-pointer">
                <p className="text-sm">点击更换封面图片</p>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button className="flex-1" onClick={() => setIsEditing(false)}>
                <Save className="h-3.5 w-3.5 mr-1" />保存
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>取消</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FamilyDetail;
