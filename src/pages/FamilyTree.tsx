import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { familyTreeNodes, FamilyTreeNode } from '@/data/mockData';
import { X, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FamilyTree = () => {
  const [selectedNode, setSelectedNode] = useState<FamilyTreeNode | null>(null);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const generations = [1, 2, 3];
  const genLabels: Record<number, string> = { 1: '第一代', 2: '第二代', 3: '第三代' };

  const getNodesByGeneration = (gen: number) =>
    familyTreeNodes.filter(n => n.generation === gen);

  const handleZoomIn = () => setScale(s => Math.min(s + 0.2, 2));
  const handleZoomOut = () => setScale(s => Math.max(s - 0.2, 0.5));
  const handleReset = () => { setScale(1); setTranslate({ x: 0, y: 0 }); };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, tx: translate.x, ty: translate.y };
  }, [translate]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    setTranslate({
      x: dragStart.current.tx + (e.clientX - dragStart.current.x),
      y: dragStart.current.ty + (e.clientY - dragStart.current.y),
    });
  }, [isDragging]);

  const handleMouseUp = () => setIsDragging(false);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setScale(s => Math.min(2, Math.max(0.5, s - e.deltaY * 0.001)));
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">家谱树</h1>
          <p className="text-muted-foreground mt-1">血脉相连，代代传承 · 点击人物查看详情</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handleZoomOut} title="缩小">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground min-w-[3rem] text-center">{Math.round(scale * 100)}%</span>
          <Button variant="outline" size="icon" onClick={handleZoomIn} title="放大">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleReset} title="重置">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mb-6 text-sm text-muted-foreground">
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
          <span className="w-6 border-t-2 border-dashed border-accent/50" />配偶关系
        </span>
      </div>

      {/* Zoomable / pannable canvas */}
      <div
        ref={containerRef}
        className="paper-card overflow-hidden relative"
        style={{ height: '60vh', cursor: isDragging ? 'grabbing' : 'grab' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <div
          className="absolute inset-0 flex flex-col justify-center items-center py-10"
          style={{
            transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.2s ease-out',
          }}
        >
          <div className="space-y-10">
            {generations.map((gen, gi) => (
              <div key={gen}>
                <div className="text-xs text-muted-foreground font-serif mb-3 tracking-widest text-center">
                  {genLabels[gen]}
                </div>

                {gi > 0 && (
                  <div className="flex justify-center -mt-3 mb-3">
                    <div className="w-0.5 h-6 bg-primary/20" />
                  </div>
                )}

                <div className="flex flex-wrap justify-center gap-4">
                  {getNodesByGeneration(gen).map(node => {
                    const spouse = node.spouseId ? familyTreeNodes.find(n => n.id === node.spouseId) : null;
                    if (familyTreeNodes.some(n => n.spouseId === node.id)) return null;

                    return (
                      <div key={node.id} className="flex items-center gap-2">
                        <NodeCard node={node} onClick={() => setSelectedNode(node)} isSelected={selectedNode?.id === node.id} />
                        {spouse && (
                          <>
                            <div className="w-6 border-t-2 border-dashed border-accent/40" />
                            <NodeCard node={spouse} onClick={() => setSelectedNode(spouse)} isSelected={selectedNode?.id === spouse.id} />
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90vw] max-w-md z-50"
          >
            <div className="paper-card p-6 border-2 border-primary/20 shadow-lg relative">
              <button
                onClick={() => setSelectedNode(null)}
                className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${selectedNode.gender === '男' ? 'bg-primary/10' : 'bg-accent/10'}`}>
                  <span className="font-serif text-xl font-bold text-foreground">{selectedNode.name[0]}</span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-serif text-lg font-bold text-foreground">{selectedNode.name}</h3>
                  <div className="flex flex-wrap gap-2 mt-1 text-xs text-muted-foreground">
                    {selectedNode.relation && <span className="bg-secondary px-2 py-0.5 rounded-full">{selectedNode.relation}</span>}
                    <span>{selectedNode.gender}</span>
                    <span>
                      {selectedNode.birthYear}{selectedNode.deathYear ? `–${selectedNode.deathYear}` : '–至今'}
                    </span>
                  </div>
                  {selectedNode.bio && (
                    <p className="text-sm text-foreground/80 mt-3 leading-relaxed">{selectedNode.bio}</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const NodeCard = ({ node, onClick, isSelected }: { node: FamilyTreeNode; onClick: () => void; isSelected: boolean }) => (
  <motion.div
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.95 }}
    onClick={(e) => { e.stopPropagation(); onClick(); }}
    className={`paper-card px-5 py-4 text-center min-w-[120px] border-2 cursor-pointer select-none transition-colors duration-200
      ${node.gender === '男' ? 'border-primary/30' : 'border-accent/40'}
      ${isSelected ? 'ring-2 ring-primary/50 bg-secondary' : 'hover:bg-secondary/50'}
    `}
  >
    <div className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center ${node.gender === '男' ? 'bg-primary/10' : 'bg-accent/10'}`}>
      <span className="font-serif font-bold text-foreground">{node.name[0]}</span>
    </div>
    <p className="font-serif text-sm font-semibold text-foreground">{node.name}</p>
    <p className="text-[10px] text-muted-foreground">
      {node.birthYear}{node.deathYear ? `–${node.deathYear}` : ''}
    </p>
    {node.relation && <p className="text-[10px] text-accent mt-0.5">{node.relation}</p>}
  </motion.div>
);

export default FamilyTree;
