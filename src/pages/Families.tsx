import { Link } from 'react-router-dom';
import { Plus, Users, Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { families } from '@/data/mockData';

const Families = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">家庭空间</h1>
          <p className="text-muted-foreground mt-1">管理你的家庭，记录温暖时光</p>
        </div>
        <Button asChild>
          <Link to="/families/create"><Plus className="h-4 w-4 mr-1" />创建家庭</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {families.map((family, i) => (
          <motion.div
            key={family.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="paper-card overflow-hidden hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img src={family.coverUrl} alt={family.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-5">
              <h3 className="font-serif text-xl font-semibold text-foreground mb-1">{family.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{family.description}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{family.memberCount} 人</span>
                <span className="flex items-center gap-1"><Camera className="h-3.5 w-3.5" />{family.photoCount} 张</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Families;
