import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, RotateCcw, RotateCw, Pencil, Trash2, X, UserPlus, Send, Calendar, MapPin, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { photos } from '@/data/mockData';

interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
}

const PhotoDetail = () => {
  const { id } = useParams();
  const photo = photos.find(p => p.id === id);

  const [editOpen, setEditOpen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [taggedPeople, setTaggedPeople] = useState<string[]>(photo?.people ?? []);
  const [newTag, setNewTag] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');

  // Edit form state
  const [editDate, setEditDate] = useState(photo?.date ?? '');
  const [editFuzzyDate, setEditFuzzyDate] = useState('');
  const [editCountry, setEditCountry] = useState('');
  const [editCity, setEditCity] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editDesc, setEditDesc] = useState(photo?.description ?? '');

  if (!photo) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">照片不存在</p>
        <Button asChild variant="outline" className="mt-4">
          <Link to="/photos">返回照片墙</Link>
        </Button>
      </div>
    );
  }

  const handleAddTag = () => {
    const trimmed = newTag.trim();
    if (trimmed && !taggedPeople.includes(trimmed)) {
      setTaggedPeople([...taggedPeople, trimmed]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (name: string) => {
    setTaggedPeople(taggedPeople.filter(p => p !== name));
  };

  const handleAddComment = () => {
    const trimmed = commentText.trim();
    if (!trimmed) return;
    setComments([...comments, {
      id: Date.now().toString(),
      author: '我',
      content: trimmed,
      date: new Date().toLocaleDateString('zh-CN'),
    }]);
    setCommentText('');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <Link to="/photos" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
          返回照片墙
        </Link>
        <div className="flex items-center gap-2">
          <button onClick={() => setRotation(r => r - 90)} className="p-2 text-muted-foreground hover:text-foreground" title="逆时针旋转">
            <RotateCcw className="h-4 w-4" />
          </button>
          <button onClick={() => setRotation(r => r + 90)} className="p-2 text-muted-foreground hover:text-foreground" title="顺时针旋转">
            <RotateCw className="h-4 w-4" />
          </button>
          <button onClick={() => setEditOpen(true)} className="text-sm text-primary hover:underline font-medium flex items-center gap-1">
            <Pencil className="h-3.5 w-3.5" />编辑信息
          </button>
          <button className="text-sm text-destructive hover:underline font-medium flex items-center gap-1">
            <Trash2 className="h-3.5 w-3.5" />删除照片
          </button>
        </div>
      </div>

      {/* Photo */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="paper-card overflow-hidden mb-6"
      >
        <div className="bg-muted/30 flex items-center justify-center p-4" style={{ minHeight: '400px' }}>
          <img
            src={photo.url.replace('w=400&h=400', 'w=800&h=800')}
            alt={photo.title}
            className="max-w-full max-h-[60vh] object-contain rounded-sm transition-transform duration-300"
            style={{ transform: `rotate(${rotation}deg)` }}
          />
        </div>
      </motion.div>

      {/* Info section */}
      <div className="space-y-2 mb-6 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>内容时间：</span>
          <span className="font-semibold text-foreground">{photo.date || '时间未知'}</span>
        </div>

        {/* Scan detection hint */}
        <div className="paper-card border-2 border-accent/30 bg-accent/5 p-4 rounded-lg">
          <p className="text-sm text-accent-foreground">
            <span className="text-accent font-medium">检测到这可能是翻拍/扫描件，</span>文件时间可能不代表照片内容的时间。
          </p>
          <div className="flex gap-3 mt-3">
            <Button variant="outline" size="sm" className="text-xs">用文件时间作为内容时间</Button>
            <Button size="sm" className="text-xs" onClick={() => setEditOpen(true)}>设置内容时间</Button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Camera className="h-3.5 w-3.5" />
          文件拍摄时间（EXIF）：{photo.date}（MANUAL）
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>上传者：demo_user</span>
          <span>上传于 {new Date().toLocaleDateString('zh-CN')}</span>
        </div>
      </div>

      {/* People tags */}
      <div className="paper-card p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-serif text-base font-semibold text-foreground">照片中的人物</h3>
          <button
            onClick={() => {
              const name = prompt('输入人物名称');
              if (name?.trim()) {
                if (!taggedPeople.includes(name.trim())) {
                  setTaggedPeople([...taggedPeople, name.trim()]);
                }
              }
            }}
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            <UserPlus className="h-3.5 w-3.5" />标记人物
          </button>
        </div>
        {taggedPeople.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {taggedPeople.map(name => (
              <span key={name} className="inline-flex items-center gap-1 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                {name}
                <button onClick={() => handleRemoveTag(name)} className="text-muted-foreground hover:text-destructive ml-0.5">
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">暂无标记人物</p>
        )}
      </div>

      {/* Comments */}
      <div className="mb-10">
        <h3 className="font-serif text-lg font-semibold text-foreground mb-4">评论（{comments.length}）</h3>
        {comments.length === 0 && (
          <p className="text-sm text-muted-foreground mb-4">还没有评论</p>
        )}
        <div className="space-y-3 mb-4">
          {comments.map(c => (
            <div key={c.id} className="paper-card p-4">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span className="font-medium text-foreground">{c.author}</span>
                <span>{c.date}</span>
              </div>
              <p className="text-sm text-foreground/90">{c.content}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <Input
            placeholder="写一条评论..."
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAddComment()}
            className="flex-1"
          />
          <Button onClick={handleAddComment}>
            <Send className="h-4 w-4 mr-1" />发送
          </Button>
        </div>
      </div>

      {/* Edit Dialog */}
      <AnimatePresence>
        {editOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 backdrop-blur-sm"
            onClick={() => setEditOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="paper-card p-8 w-[90vw] max-w-lg mx-4 max-h-[80vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="font-serif text-xl font-bold text-foreground mb-6">编辑照片信息</h2>

              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">内容时间（精确日期）</label>
                  <Input
                    type="date"
                    value={editDate}
                    onChange={e => setEditDate(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">照片内容发生的时间，用于时间轴排序</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">内容时间（模糊描述）</label>
                  <Input
                    placeholder="如：1980年代、约1995年春"
                    value={editFuzzyDate}
                    onChange={e => setEditFuzzyDate(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">无精确日期时填写模糊描述（如年代、季节）</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">地点</label>
                  <div className="grid grid-cols-3 gap-3">
                    <Input placeholder="国家" value={editCountry} onChange={e => setEditCountry(e.target.value)} />
                    <Input placeholder="城市" value={editCity} onChange={e => setEditCity(e.target.value)} />
                    <Input placeholder="具体位置" value={editLocation} onChange={e => setEditLocation(e.target.value)} />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">描述</label>
                  <Textarea
                    placeholder="照片描述"
                    value={editDesc}
                    onChange={e => setEditDesc(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <Button variant="outline" onClick={() => setEditOpen(false)}>取消</Button>
                <Button onClick={() => setEditOpen(false)}>保存</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhotoDetail;
