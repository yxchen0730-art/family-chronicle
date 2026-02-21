import { motion } from 'framer-motion';
import { familyTreeNodes } from '@/data/mockData';

const FamilyTree = () => {
  const generations = [1, 2, 3];

  const getNodesByGeneration = (gen: number) =>
    familyTreeNodes.filter(n => n.generation === gen);

  const genLabels: Record<number, string> = { 1: '第一代', 2: '第二代', 3: '第三代' };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="font-serif text-3xl font-bold text-foreground">家谱树</h1>
        <p className="text-muted-foreground mt-1">血脉相连，代代传承</p>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mb-8 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-primary/70" />男性
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-accent" />女性
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-6 h-0.5 bg-primary/30" />亲子关系
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-6 h-0.5 bg-accent/50 border-dashed border-t-2 border-accent/50 h-0" />配偶关系
        </span>
      </div>

      <div className="space-y-8">
        {generations.map((gen, gi) => (
          <motion.div
            key={gen}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: gi * 0.15 }}
          >
            <div className="text-xs text-muted-foreground font-serif mb-3 tracking-widest">{genLabels[gen]}</div>

            {/* Connector line */}
            {gi > 0 && (
              <div className="flex justify-center -mt-3 mb-3">
                <div className="w-0.5 h-6 bg-primary/20" />
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-4">
              {getNodesByGeneration(gen).map(node => {
                const spouse = node.spouseId ? familyTreeNodes.find(n => n.id === node.spouseId) : null;
                if (familyTreeNodes.some(n => n.spouseId === node.id)) return null; // skip spouse rendered as pair

                return (
                  <div key={node.id} className="flex items-center gap-2">
                    <NodeCard node={node} />
                    {spouse && (
                      <>
                        <div className="w-6 border-t-2 border-dashed border-accent/40" />
                        <NodeCard node={spouse} />
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const NodeCard = ({ node }: { node: typeof familyTreeNodes[0] }) => (
  <div className={`paper-card px-5 py-4 text-center min-w-[120px] border-2 ${node.gender === '男' ? 'border-primary/30' : 'border-accent/40'}`}>
    <div className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center ${node.gender === '男' ? 'bg-primary/10' : 'bg-accent/10'}`}>
      <span className="font-serif font-bold text-foreground">{node.name[0]}</span>
    </div>
    <p className="font-serif text-sm font-semibold text-foreground">{node.name}</p>
    <p className="text-[10px] text-muted-foreground">
      {node.birthYear}{node.deathYear ? `–${node.deathYear}` : ''}
    </p>
  </div>
);

export default FamilyTree;
