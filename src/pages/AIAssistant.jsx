import React, { useState } from 'react';
import { Bot, Send, Sparkles } from 'lucide-react';
import aiChatData from '../data/aiChat.json';

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { from: 'ai', text: aiChatData.greeting }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);

    // Simple keyword matching
    let reply = 'Maaf, saya belum mengerti pertanyaan Anda. Silakan coba pertanyaan lain.';
    const lower = input.toLowerCase();
    if (lower.includes('akad') || lower.includes('bagi hasil')) reply = aiChatData.responses.akad;
    else if (lower.includes('halal') || lower.includes('riba') || lower.includes('haram')) reply = aiChatData.responses.halal;
    else if (lower.includes('zakat') || lower.includes('nisab')) reply = aiChatData.responses.zakat;

    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'ai', text: reply }]);
    }, 500);

    setInput('');
  };

  const quickPrompt = (query) => {
    setInput(query);
    setTimeout(handleSend, 100);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] pb-20 md:pb-8">
      <div className="flex items-center gap-2 mb-4">
        <Bot className="text-gold-600" size={28} />
        <h1 className="text-2xl font-bold">AI Assistant</h1>
        <span className="badge-syariah"><Sparkles size={12} /> Edukasi & Rekomendasi</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.from === 'user' ? 'bg-gold-600 text-white' : 'bg-neutral-100 text-neutral-800'}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-2">
        {aiChatData.quickPrompts.map((p, i) => (
          <button key={i} onClick={() => quickPrompt(p.query)} className="text-xs bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-3 py-1.5 rounded-full transition-colors">
            {p.label}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Ketik pertanyaan Anda..." className="flex-1 border border-neutral-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gold-500" />
        <button onClick={handleSend} className="btn-primary px-4 py-3"><Send size={18} /></button>
      </div>
    </div>
  );
}