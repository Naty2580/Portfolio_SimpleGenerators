import  { useState, useDeferredValue } from 'react';
import { ArrowLeft, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ProfileCardGenerator() {
  const [profile, setProfile] = useState({
    name: 'Alex Chen',
    role: 'UX/UI Architect',
    bio: 'Crafting digital experiences in the neon void.',
    tags: 'Design, React, WebGL'
  });

  const deferredProfile = useDeferredValue(profile);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-[85vh] relative rounded-[40px] overflow-hidden p-6 md:p-12 lg:p-20 font-sans text-white border border-white/10 shadow-2xl bg-[#050510]">
      {/* Aurora Background */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-600/40 rounded-full blur-[120px] mix-blend-screen" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-600/40 rounded-full blur-[120px] mix-blend-screen" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 h-full">
        {/* Editor Side */}
        <div className="space-y-8">
          <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8">
            <ArrowLeft size={18} /> Home
          </Link>
          
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Aura Card Generator</h1>
            <p className="text-white/50">Build your glassmorphic digital identity.</p>
          </div>

          <div className="space-y-4">
            {['name', 'role', 'bio', 'tags'].map((field) => (
              <div key={field} className="relative">
                <input 
                  type="text" 
                  name={field}
                  value={profile[field]} 
                  onChange={handleChange}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-accent/50 focus:bg-white/10 transition-all text-white placeholder:text-white/30"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Live Preview Side */}
        <div className="flex items-center justify-center">
          <motion.div 
            layout
            className="w-full max-w-sm aspect-[3/4] bg-white/20 backdrop-blur-2xl border border-white/20 rounded-[32px] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex flex-col relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b  from-white/10 to-transparent" />
            
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center mt-8">
              <div className="w-28 h-28 rounded-full bg-white/5 border border-white/20 shadow-inner flex items-center justify-center mb-6 overflow-hidden">
                <Camera size={32} className="text-white/20" />
                {/* Fallback avatar image */}
                <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${deferredProfile.name}`} alt="avatar" className="absolute inset-0 w-full h-full opacity-20" />
              </div>
              
              <h2 className="text-3xl font-bold tracking-tight mb-1">{deferredProfile.name || 'Anonymous'}</h2>
              <p className="text-accent font-medium text-sm tracking-widest uppercase mb-6">{deferredProfile.role}</p>
              <p className="text-white/70 leading-relaxed mb-8">{deferredProfile.bio}</p>
              
              <div className="flex flex-wrap justify-center gap-2 mt-auto">
                {deferredProfile.tags.split(',').map((tag, i) => (
                  <span key={i} className="text-xs bg-white/10 px-3 py-1.5 rounded-full border border-white/5">
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}