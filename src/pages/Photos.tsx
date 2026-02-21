import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Upload, Search, X, ChevronLeft, ChevronRight, Calendar, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { photos, Photo } from '@/data/mockData';

const Photos = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedPhoto = selectedIndex !== null ? photos[selectedIndex] : null;

  const goNext = () => setSelectedIndex(i => (i !== null && i < photos.length - 1) ? i + 1 : i);
  const goPrev = () => setSelectedIndex(i => (i !== null && i > 0) ? i - 1 : i);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setSelectedIndex(null);
    if (e.key === 'ArrowRight') goNext();
    if (e.key === 'ArrowLeft') goPrev();
  };

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
            onClick={() => setSelectedIndex(i)}
          >
            <Link to={`/photos/${photo.id}`} className="block" onClick={e => e.stopPropagation()}>
              <div className="aspect-square overflow-hidden rounded-sm">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:sepia-[0.2] transition-all duration-300"
                />
              </div>
            </Link>
            <p className="mt-2 text-xs text-muted-foreground text-center font-serif">{photo.title}</p>
            <p className="text-[10px] text-muted-foreground/60 text-center">{photo.date}</p>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 backdrop-blur-sm"
            onClick={() => setSelectedIndex(null)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            ref={el => el?.focus()}
          >
            {/* Close */}
            <button className="absolute top-4 right-4 text-background/80 hover:text-background z-10" onClick={() => setSelectedIndex(null)}>
              <X className="h-6 w-6" />
            </button>

            {/* Prev */}
            {selectedIndex !== null && selectedIndex > 0 && (
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-background/60 hover:text-background z-10"
                onClick={e => { e.stopPropagation(); goPrev(); }}
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
            )}

            {/* Next */}
            {selectedIndex !== null && selectedIndex < photos.length - 1 && (
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-background/60 hover:text-background z-10"
                onClick={e => { e.stopPropagation(); goNext(); }}
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            )}

            {/* Content */}
            <motion.div
              key={selectedPhoto.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="polaroid max-w-2xl w-[90vw] mx-4"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={selectedPhoto.url.replace('w=400&h=400', 'w=800&h=800')}
                alt={selectedPhoto.title}
                className="w-full aspect-[4/3] object-cover rounded-sm"
              />
              <div className="pt-3 pb-1 px-1">
                <h3 className="font-serif text-lg font-semibold text-foreground">{selectedPhoto.title}</h3>
                {selectedPhoto.description && (
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{selectedPhoto.description}</p>
                )}
                <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{selectedPhoto.date}</span>
                  {selectedPhoto.people.length > 0 && (
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" />{selectedPhoto.people.join('、')}</span>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-background/60 text-sm">
              {(selectedIndex ?? 0) + 1} / {photos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Photos;
