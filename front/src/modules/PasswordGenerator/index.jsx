import  { useState,useEffect, useTransition, useDeferredValue } from 'react';
import { Copy, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [password, setPassword] = useState('Generating...');
  const [isPending, startTransition] = useTransition();
  const deferredPassword = useDeferredValue(password);

  const generate = (len) => {
    startTransition(() => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
      let res = "";
      for (let i = 0; i < len; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
      setPassword(res);
    });
  };

  // Generate on mount
 useEffect(() => generate(length), [length]);

  return (
    <div className="min-h-[80vh] bg-[#f8f5f2] text-[#1a1a1a] rounded-[40px] p-10 lg:p-20 font-serif relative overflow-hidden flex flex-col justify-between">
      <Link to="/" className="flex items-center gap-2 text-sm uppercase tracking-widest hover:opacity-50 transition-opacity font-sans mb-20 w-fit">
        <ArrowLeft size={16} /> Return
      </Link>
      
      <div className="max-w-4xl mx-auto w-full space-y-16">
        <div className="space-y-4">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-gray-500">Exhibit 01 &mdash; Security</p>
          <h1 className="text-5xl lg:text-7xl font-light italic">The Cipher.</h1>
        </div>

        <div className="relative group cursor-pointer" onClick={() => navigator.clipboard.writeText(deferredPassword)}>
          <h2 className={`text-4xl lg:text-6xl font-sans tracking-tight break-all border-b border-black/10 pb-8 transition-opacity ${isPending ? 'opacity-40' : 'opacity-100'}`}>
            {deferredPassword}
          </h2>
          <div className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <Copy size={24} className="text-black/40" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-12 font-sans text-sm">
          <div className="flex-1 space-y-4">
            <div className="flex justify-between uppercase tracking-widest text-xs text-gray-500">
              <span>Length</span>
              <span>{length}</span>
            </div>
            <input 
              type="range" min="8" max="64" value={length} 
              onChange={(e) => {
                setLength(e.target.value);
                generate(e.target.value);
              }}
              className="w-full appearance-none bg-black/10 h-[1px] outline-none cursor-ew-resize [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#1a1a1a]"
            />
          </div>
          <button 
            onClick={() => generate(length)}
            className="border border-black/20 px-8 py-3 rounded-full hover:bg-[#1a1a1a] hover:text-white transition-colors duration-500 uppercase tracking-widest text-xs"
          >
            Regenerate
          </button>
        </div>
      </div>
    </div>
  );
}