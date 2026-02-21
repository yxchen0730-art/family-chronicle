import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { people } from '@/data/mockData';

const People = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-foreground">人物档案</h1>
        <p className="text-muted-foreground mt-1">记住每一位家人的故事</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {people.map((person, i) => (
          <motion.div
            key={person.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Link
              to={`/people/${person.id}`}
              className="paper-card p-6 flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300 block"
            >
              {/* Avatar */}
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center ring-2 ring-primary/20 flex-shrink-0">
                <span className="font-serif text-xl font-bold text-primary">{person.name[0]}</span>
              </div>
              <div className="min-w-0">
                <h3 className="font-serif text-lg font-semibold text-foreground">{person.name}</h3>
                <p className="text-sm text-muted-foreground">{person.relation}
                  {person.birthYear && <span> · {person.birthYear}{person.deathYear ? `–${person.deathYear}` : '至今'}</span>}
                </p>
                <p className="text-xs text-muted-foreground/70 flex items-center gap-1 mt-1">
                  <Camera className="h-3 w-3" />{person.photoCount} 张照片
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default People;
