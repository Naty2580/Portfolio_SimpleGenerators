/* eslint-disable react-hooks/set-state-in-effect */
import  { useState, useEffect } from 'react';
import {  RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RandomUserGenerator() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const extras = {
    jobs: ['Senior Prompt Engineer', 'Cybernetic Botanist', 'Void Architect', 'Data Janitor'],
    devices: ['NeuralLink v4', 'iPhone 17 Pro', 'ThinkPad T420', 'Pip-Boy 3000'],
    bios: ['Living in the grid.', '404 Brain not found.', 'Overclocked & underpaid.', 'Consuming RAM.']
  };

  const fetchUser = async () => {
    setLoading(true);
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();
    const u = data.results[0];
    
    // Inject 5 custom extra fields deterministically based on random data
    u.extra = {
      jobTitle: extras.jobs[Math.floor(Math.random() * extras.jobs.length)],
      timezone: u.location.timezone.description,
      ip: `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.1.42`,
      device: extras.devices[Math.floor(Math.random() * extras.devices.length)],
      bio: extras.bios[Math.floor(Math.random() * extras.bios.length)],
    };
    
    setUser(u);
    setLoading(false);
  };

  useEffect(() => { fetchUser(); }, []);

  return (
    <div className="min-h-[80vh] bg-[#f4e04d] text-black p-4 md:p-10 font-mono relative">
      <nav className="flex justify-between items-center border-b-4 border-black pb-4 mb-8">
        <Link to="/" className="border-4 border-black px-4 py-2 hover:bg-black hover:text-white font-bold uppercase transition-none shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none">
          &lt; BACK
        </Link>
        <h1 className="text-3xl font-black uppercase tracking-tighter">Identity.OBJ</h1>
      </nav>

      {loading ? (
        <div className="text-6xl font-black uppercase animate-pulse">LOADING_DATA...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-1 border-4 border-black p-4 bg-white shadow-[8px_8px_0px_#000]">
            <img src={user.picture.large} alt="Profile" className="w-full aspect-square object-cover border-4 border-black mb-4 grayscale hover:grayscale-0 transition-all" />
            <h2 className="text-3xl font-black bg-cyan-300 border-4 border-black inline-block px-2 mb-2">{user.name.first} {user.name.last}</h2>
            <p className="text-xl font-bold bg-[#ff3366] text-white border-4 border-black inline-block px-2">{user.extra.jobTitle}</p>
          </div>

          <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_#000]">
              <h3 className="bg-black text-white inline-block px-2 mb-4 font-bold">CORE_DATA</h3>
              <ul className="space-y-3 font-bold text-sm">
                <li><span className="text-gray-500">AGE:</span> {user.dob.age}</li>
                <li><span className="text-gray-500">GENDER:</span> {user.gender}</li>
                <li><span className="text-gray-500">EMAIL:</span> {user.email}</li>
                <li><span className="text-gray-500">PASS:</span> {user.login.password}</li>
                <li><span className="text-gray-500">PHONE:</span> {user.phone}</li>
                <li><span className="text-gray-500">LOC:</span> {user.location.country}, {user.location.state}</li>
              </ul>
            </div>

            <div className="border-4 border-black bg-cyan-300 p-6 shadow-[8px_8px_0px_#000]">
              <h3 className="bg-black text-white inline-block px-2 mb-4 font-bold">EXTRA_META</h3>
              <ul className="space-y-3 font-bold text-sm">
                <li><span className="text-black/60">BIO:</span> {user.extra.bio}</li>
                <li><span className="text-black/60">TZ:</span> {user.extra.timezone}</li>
                <li><span className="text-black/60">IP:</span> {user.extra.ip}</li>
                <li><span className="text-black/60">DEVICE:</span> {user.extra.device}</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <button onClick={fetchUser} className="fixed bottom-10 right-10 border-4 border-black bg-[#ff3366] text-white p-4 rounded-full shadow-[6px_6px_0px_#000] hover:bg-black hover:text-[#ff3366] active:translate-x-1 active:translate-y-1 active:shadow-none z-50">
        <RefreshCw size={32} className={loading ? 'animate-spin' : ''} />
      </button>
    </div>
  );
}