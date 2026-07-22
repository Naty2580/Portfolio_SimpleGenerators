import  { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function JokeGenerator() {
  const [joke, setJoke] = useState({ setup: "Click the big button", delivery: "Do it now!" });

  const fetchJoke = async () => {
    const res = await fetch('https://v2.jokeapi.dev/joke/Programming,Pun?type=twopart');
    const data = await res.json();
    setJoke({ setup: data.setup, delivery: data.delivery });
  };

  return (
    <div className="min-h-[90vh] bg-[#FF00FF] rounded-[60px] overflow-hidden relative font-sans">
      {/* Background Noise & Shapes */}
      <div className="absolute inset-0 bg-[url('/noise.png')] mix-blend-overlay opacity-50 pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#00FFFF] rounded-full mix-blend-multiply blur-3xl opacity-80 animate-pulse" />
      
      {/* Infinite Marquee */}
      <div className="absolute top-20 -left-10 w-[120%] bg-yellow-400 text-black font-black text-4xl py-2 -rotate-3 border-y-8 border-black z-0 whitespace-nowrap overflow-hidden flex">
        <motion.div animate={{ x: [0, -1000] }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }} className="flex gap-4">
          {[...Array(10)].map((_, i) => <span key={i}> HAHA MAXIMALISM CHAOS LOL </span>)}
        </motion.div>
      </div>

      <div className="relative z-10 p-10 lg:p-20 h-full flex flex-col items-start pt-40">
        <Link to="/" className="bg-black text-white font-mono px-6 py-3 rounded-full hover:bg-white hover:text-black mb-10 text-2xl border-4 border-transparent hover:border-black transition-all">
          <ArrowLeft className="inline mr-2" /> LEAVE
        </Link>

        <div className="relative w-full max-w-6xl mt-10">
          <motion.h2 
            key={joke.setup}
            initial={{ y: 50, opacity: 0, rotate: -5 }}
            animate={{ y: 0, opacity: 1, rotate: -2 }}
            className="text-6xl md:text-8xl font-black text-white bg-black inline-block p-4 leading-none border-8 border-yellow-400 shadow-[15px_15px_0_#00FFFF]"
          >
            {joke.setup}
          </motion.h2>

          <motion.h3 
            key={joke.delivery}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring', bounce: 0.6 }}
            className="text-5xl md:text-7xl font-serif italic text-black bg-[#00FFFF] p-6 mt-10 rounded-full border-4 border-black inline-block shadow-[10px_10px_0_#FF00FF] ml-10"
          >
            {joke.delivery}
          </motion.h3>
        </div>

        <button onClick={fetchJoke} className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-400 text-black font-black text-3xl rounded-full border-8 border-black shadow-[10px_10px_0_#000] hover:scale-110 active:scale-90 transition-transform flex items-center justify-center rotate-12 hover:rotate-0 z-50">
          MORE!
        </button>
      </div>
    </div>
  );
}