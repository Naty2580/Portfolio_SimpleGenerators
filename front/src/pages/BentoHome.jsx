import  { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { generatorsConfig } from '../config/generators';

const BentoCard = ({ item, index }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
      className={item.span}
    >
      <Link
        to={item.path}
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className={`bento-hover-glow glass-panel block h-full p-8 rounded-3xl overflow-hidden group bg-gradient-to-br ${item.color} border border-white/5 hover:border-white/20 transition-all`}
      >
        <div className="relative z-10 flex flex-col h-full justify-between gap-8">
          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform duration-500">
            <item.icon className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-2 group-hover:text-accent transition-colors">
              {item.name}
            </h2>
            <p className="text-white/50 text-sm font-medium">{item.description}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default function BentoHome() {
  return (
    <div className="max-w-[1600px] mx-auto">
      <header className="mb-16 md:mb-24 mt-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-accent font-mono text-sm tracking-widest uppercase mb-4 block">System Core</span>
          <h1>Multi-Gen Matrix</h1>
        </motion.div>
      </header>

      <div className="grid grid-cols-12 auto-rows-[240px] gap-4 md:gap-6 lg:gap-8">
        {generatorsConfig.map((item, index) => (
          <BentoCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}