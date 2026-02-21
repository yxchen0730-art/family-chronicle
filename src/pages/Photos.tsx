import { Upload, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { photos } from '@/data/mockData';

const Photos = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">照片墙</h1>
          <p className="text-muted-foreground mt-1">珍藏每一个温暖瞬间</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="搜索照片..." className="pl-9 w-48" />
          </div>
          <Button><Upload className="h-4 w-4 mr-1" />上传照片</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {photos.map((photo, i) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className="polaroid cursor-pointer group hover:-translate-y-1 transition-all duration-300"
          >
            <div className="aspect-square overflow-hidden rounded-sm">
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:sepia-[0.2] transition-all duration-300"
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground text-center font-serif">{photo.title}</p>
            <p className="text-[10px] text-muted-foreground/60 text-center">{photo.date}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Photos;
