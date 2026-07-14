import React, { useState, useRef, useEffect } from 'react';

export default function AIAssistant() {
  // Simulasi basis pengetahuan robo-advisor syariah
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Assalamu'alaikum! Saya PROPIN Syariah Assistant. Saya siap membantu Anda menganalisis kehalalan aset, menghitung simulasi imbal hasil, atau menjelaskan skema akad di platform ini. Ada yang ingin Anda tanyakan?",
      time: 'Just now'
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Rekomendasi pertanyaan cepat (Quick Prompts)
  const quickPrompts = [
    { label: "📜 Jelaskan Akad Musyarakah", query: "Bagaimana skema pembagian keuntungan dan risiko pada Akad Musyarakah Mutanaqisah di PROPIN?" },
    { label: "⚖️ Status Hukum Token Properti", query: "Apakah kepemilikan pecahan (fractional ownership) properti lewat token digital ini sah dan halal menurut MUI?" },
    { label: "💰 Konsultasi Nisab Zakat", query: "Harta investasi saya saat ini bernilai Rp 150 Juta. Apakah saya sudah wajib mengeluarkan zakat investasi?" }
  ];

  // Auto-scroll ke pesan paling bawah setiap ada chat baru
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Simulasi jawaban AI berbasis kata kunci (Mock AI Engine)
  const handleSendMessage = (textToSend) => {
    if (!textToSend.trim()) return;

    // Tambah pesan user ke chat
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulasi delay respons AI (~1.2 detik)
    setTimeout(() => {
      let aiResponse = "Maaf, saya sedang memperbarui basis data syariah saya mengenai topik tersebut. Silakan hubungi Dewan Pengawas Syariah (DPS) kami untuk jawaban yang lebih komprehensif.";
      const lowerText = textToSend.toLowerCase();

      if (lowerText.includes('akad') || lowerText.includes('musyarakah')) {
        aiResponse = "Di PROPIN, kami menggunakan Akad Musyarakah Mutanaqisah (kongsi penurunan kepemilikan). Properti dibeli bersama antara Anda, investor lain, dan mitra pengelola. Seiring waktu, porsi kepemilikan pengelola menurun karena dibeli bertahap dari bagi hasil sewa, menjadikannya 100% milik investor syariah tanpa unsur riba.";
      } else if (lowerText.includes('halal') || lowerText.includes('mui') || lowerText.includes('token')) {
        aiResponse = "Tokenisasi di PROPIN bersifat aset-terikat (asset-backed token). Setiap token mewakili hak kepemilikan atas meter persegi fisik properti riil, bukan sekadar instrumen spekulatif. Hal ini selaras dengan prinsip Fatwa DSN-MUI No. 110 tentang Akad Jual Beli, karena objek komoditasnya (properti) jelas dan bernilai ekonomi nyata.";
      } else if (lowerText.includes('zakat') || lowerText.includes('nisab')) {
        aiResponse = "Betul sekali. Batas Nisab zakat mal/investasi setara dengan 85 gram emas (sekitar Rp 123.250.000). Karena total aset Anda Rp 150 Juta telah melewati batas nisab dan jika sudah berjalan 1 tahun penuh (haul), Anda wajib menunaikan zakat sebesar 2,5% yaitu sekitar Rp 3.750.000. Anda bisa mengaktifkan fitur Auto-Zakat di menu Wallet.";
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header Halaman */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-neutral-800 font-brand">Syariah Robo-Advisor</h1>
        <p className="text-sm text-neutral-600">Konsultasikan kepatuhan fikih muamalah dan strategi portofolio real estate Anda secara real-time.</p>
      </div>

      <hr className="border-neutral-200" />

      {/* Main Chat Container Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Panel Kiri: Panduan & Informasi Asisten */}
        <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 space-y-4 lg:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold-50 border border-gold-200 flex items-center justify-center text-lg">
              🤖
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-800">PROPIN-Bot v1.0</h3>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></span>
                Patuh Syariah
              </span>
            </div>
          </div>
          
          <p className="text-xs text-neutral-500 leading-relaxed">
            Asisten virtual ini diprogram menggunakan basis data Fikih Muamalah Kontemporer serta Fatwa Dewan Syariah Nasional (DSN-MUI) untuk memberikan jawaban instan yang terverifikasi.
          </p>
          
          <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-100">
            <h4 className="text-[11px] font-bold text-neutral-700 mb-1">Pemberitahuan Singkat</h4>
            <p className="text-[10px] text-neutral-500 leading-snug">
              Jawaban bersifat edukasi dan simulasi awal. Untuk keputusan hukum final, sistem terhubung dengan komite pengawas syariah platform.
            </p>
          </div>
        </div>

        {/* Panel Kanan: Antarmuka Chat & Quick Actions */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Box Percakapan */}
          <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm flex flex-col h-[480px] overflow-hidden">
            
            {/* Area Pesan (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-4 bg-neutral-50/50">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] md:max-w-[70%] rounded-2xl p-3.5 shadow-sm text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-neutral-800 text-white rounded-tr-none'
                      : 'bg-white text-neutral-800 border border-neutral-100 rounded-tl-none'
                  }`}>
                    <p>{msg.text}</p>
                    <span className={`block text-[9px] mt-1.5 text-right ${
                      msg.sender === 'user' ? 'text-neutral-300' : 'text-neutral-400'
                    }`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}

              {/* Animasi Indikator Mengetik */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white text-neutral-800 border border-neutral-100 rounded-2xl rounded-tl-none p-3.5 shadow-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Prompts Container Inside Chat */}
            <div className="px-4 py-2 bg-white border-t border-neutral-100 flex flex-wrap gap-2 overflow-x-auto">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(prompt.query)}
                  className="text-[11px] bg-neutral-50 hover:bg-gold-50 hover:text-gold-700 hover:border-gold-300 border border-neutral-200 text-neutral-600 px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap"
                >
                  {prompt.label}
                </button>
              ))}
            </div>

            {/* Form Input Pesan */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputMessage); }}
              className="p-3 bg-white border-t border-neutral-200/80 flex gap-2 items-center"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Tanyakan sesuatu tentang hukum syariah investasi..."
                className="flex-1 bg-neutral-50 text-xs border border-neutral-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gold-500 focus:bg-white transition-all text-neutral-800"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className="bg-neutral-800 hover:bg-neutral-900 disabled:bg-neutral-200 text-white px-5 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Kirim</span>
                <span className="text-[10px]">➔</span>
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}