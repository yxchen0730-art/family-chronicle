import { motion } from 'framer-motion';
import { timelineEvents } from '@/data/mockData';

const Timeline = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="font-serif text-3xl font-bold text-foreground">家庭时间轴</h1>
        <p className="text-muted-foreground mt-1">沿着时光长河，回望那些珍贵的瞬间</p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20" />

        <div className="space-y-12">
          {timelineEvents.map((event, idx) => (
            <motion.div
              key={event.year}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative flex flex-col md:flex-row items-start gap-6 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* Year badge */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                <div className="bg-primary text-primary-foreground font-serif text-sm font-bold px-4 py-1.5 rounded-full shadow-md">
                  {event.year}
                </div>
              </div>

              {/* Content */}
              <div className={`ml-16 md:ml-0 md:w-[45%] ${idx % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                <div className="paper-card p-5">
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {event.photos.map(photo => (
                      <div key={photo.id} className="polaroid flex-shrink-0 w-32">
                        <div className="aspect-square overflow-hidden rounded-sm">
                          <img src={photo.url} alt={photo.title} className="w-full h-full object-cover" />
                        </div>
                        <p className="mt-1 text-[10px] text-muted-foreground text-center">{photo.title}</p>
                      </div>
                    ))}
                  </div>
                  {event.photos[0]?.description && (
                    <p className="text-sm text-muted-foreground mt-3">{event.photos[0].description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
