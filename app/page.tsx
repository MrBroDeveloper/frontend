import React, { useState } from 'react';
import { Terminal, Globe, Upload, Send, Cpu } from 'lucide-react';

export default function AgentUI() {
  const [url, setUrl] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleProcess = async () => {
    setLoading(true);
    // Yahan tumhara HF Space ka URL aayegi
    const HF_SPACE_URL = "https://MrBro123-agent3.hf.space/process"; 
    
    const formData = new FormData();
    if(url) formData.append('url', url);
    if(file) formData.append('file', file);

    try {
      const res = await fetch(HF_SPACE_URL, { method: 'POST', body: formData });
      const data = await res.json();
      setResponse(data.ai_answer);
    } catch (err) {
      setResponse("Error: Backend se connect nahi ho saka.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-purple-500/30 p-4 md:p-8 font-sans">
      {/* Glow Effect Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full"></div>
      </div>

      <main className="relative max-w-4xl mx-auto mt-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg shadow-lg shadow-purple-500/20">
            <Cpu size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            Agent3 <span className="text-sm font-mono text-purple-400 border border-purple-400/30 px-2 py-0.5 rounded-full uppercase tracking-widest ml-2">v1.0</span>
          </h1>
        </div>

        {/* Input Section */}
        <div className="grid gap-6">
          <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-6 shadow-2xl">
            
            {/* URL Input */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm text-gray-400 mb-2 ml-1">
                <Globe size={14} /> Web URL for Scraping
              </label>
              <input 
                type="text" 
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-gray-700"
              />
            </div>

            {/* File Upload */}
            <div className="mb-8">
              <label className="flex items-center gap-2 text-sm text-gray-400 mb-2 ml-1">
                <Upload size={14} /> Attach Documents (PDF/TXT)
              </label>
              <div className="relative group cursor-pointer">
                <input 
                  type="file" 
                  onChange={(e) => setFile(e.target.files[0])}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="border-2 border-dashed border-white/5 group-hover:border-purple-500/30 rounded-xl p-8 flex flex-col items-center justify-center transition-all bg-white/[0.01]">
                  <Upload className="text-gray-600 group-hover:text-purple-400 mb-2" />
                  <p className="text-sm text-gray-500">{file ? file.name : "Drag & Drop or Click to upload"}</p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button 
              onClick={handleProcess}
              disabled={loading}
              className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-purple-500 hover:text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? "Processing..." : <><Send size={18} /> Execute Agent</>}
            </button>
          </div>

          {/* AI Response Section */}
          {response && (
            <div className="backdrop-blur-xl bg-purple-500/5 border border-purple-500/20 rounded-2xl p-6 shadow-2xl animate-in fade-in duration-700">
              <div className="flex items-center gap-2 text-purple-400 mb-4 font-mono text-sm uppercase tracking-tighter">
                <Terminal size={16} /> Agent Output:
              </div>
              <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed whitespace-pre-wrap">
                {response}
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="mt-20 text-center text-gray-600 text-xs font-mono">
        &copy; 2026 NAQI QREATIVES | POWERED BY GROQ & HF SPACES
      </footer>
    </div>
  );
}
