import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import { people, photos } from '@/data/mockData';

const PersonDetail = () => {
  const { id } = useParams();
  const person = people.find(p => p.id === id) || people[0];
  const personPhotos = photos.filter(p => p.people.includes(person.name)).slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <Link to="/people" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" />返回人物列表
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="paper-card p-8">
        <div className="flex items-center gap-5 mb-6">
          <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center ring-2 ring-primary/20">
            <span className="font-serif text-3xl font-bold text-primary">{person.name[0]}</span>
          </div>
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground">{person.name}</h1>
            <p className="text-muted-foreground">{person.relation}
              {person.birthYear && <span> · {person.birthYear}{person.deathYear ? `–${person.deathYear}` : '至今'}</span>}
            </p>
          </div>
        </div>

        <div className="vintage-divider my-6" />

        {person.bio && (
          <div className="mb-6">
            <h2 className="font-serif text-lg font-semibold text-foreground mb-2">人生故事</h2>
            <p className="text-muted-foreground leading-relaxed">{person.bio}</p>
          </div>
        )}

        {personPhotos.length > 0 && (
          <div>
            <h2 className="font-serif text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <Camera className="h-4 w-4" />相关照片
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {personPhotos.map(photo => (
                <div key={photo.id} className="polaroid">
                  <div className="aspect-square overflow-hidden rounded-sm">
                    <img src={photo.url} alt={photo.title} className="w-full h-full object-cover" />
                  </div>
                  <p className="mt-1 text-[10px] text-muted-foreground text-center">{photo.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PersonDetail;
