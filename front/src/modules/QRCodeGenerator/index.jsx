import { useState } from 'react';
import { ArrowLeft, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function QRCodeGenerator() {
  const [text, setText] = useState('https://react.dev');
  
  // Real working QR generation via API
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}&color=2d3748&bgcolor=E0E5EC`;

  const downloadQR = async () => {
    const response = await fetch(qrUrl);
    const blob = await response.blob();
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'qr-matrix.png';
    link.click();
  };

  return (
    <div className="min-h-[80vh] bg-[#E0E5EC] text-slate-800 rounded-[40px] p-10 lg:p-20 font-sans flex flex-col">
      <Link to="/" className="p-4 rounded-full w-fit shadow-[5px_5px_10px_#a3b1c6,-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#a3b1c6,inset_-5px_-5px_10px_#ffffff] transition-shadow mb-12">
        <ArrowLeft size={20} />
      </Link>

      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mt-10">
        <div className="space-y-12">
          <h2 className="text-4xl font-bold text-slate-700 drop-shadow-sm">QR Matrix Encode</h2>
          
          <div className="space-y-4">
            <label className="block text-sm font-semibold tracking-wide text-slate-500 ml-2">DATA INPUT</label>
            <input 
              type="text" 
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-[#E0E5EC] p-6 rounded-2xl outline-none shadow-[inset_5px_5px_10px_#a3b1c6,inset_-5px_-5px_10px_#ffffff] text-slate-600 font-mono"
            />
          </div>

          <button onClick={downloadQR} className="flex items-center gap-3 bg-[#E0E5EC] px-8 py-4 rounded-xl font-bold text-slate-600 shadow-[5px_5px_10px_#a3b1c6,-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#a3b1c6,inset_-5px_-5px_10px_#ffffff] transition-all active:scale-95">
            <Download size={20} /> Export PNG
          </button>
        </div>

        <div className="flex justify-center items-center p-12 rounded-[40px] shadow-[9px_9px_16px_rgb(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.7)]">
          <img src={qrUrl} alt="QR Code" className="w-64 h-64 rounded-xl shadow-[inset_2px_2px_5px_#a3b1c6,inset_-2px_-2px_5px_#ffffff]" />
        </div>
      </div>
    </div>
  );
}