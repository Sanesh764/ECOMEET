import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Monitor, 
  MessageSquare, 
  Users, 
  PhoneOff, 
  Sparkles,
  Search,
  Send,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VideoCallScreen() {
  const { 
    activeCall, 
    declineCall,
    isMuted, 
    setIsMuted,
    isCameraOff, 
    setIsCameraOff,
    isScreenSharing, 
    setIsScreenSharing,
    isBgBlurred, 
    setIsBgBlurred
  } = useApp();

  const [sidebarView, setSidebarView] = useState(null); // null, 'chat', 'participants'
  const [chatInput, setChatInput] = useState('');
  const [callMessages, setCallMessages] = useState([
    { sender: activeCall?.user?.name, text: "Hey! Can you hear me?", time: "3:49 PM" },
    { sender: "You", text: "Yes! Loud and clear. The redesigned layout looks amazing.", time: "3:50 PM" }
  ]);

  if (!activeCall) return null;

  const handleSendCallMsg = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setCallMessages(prev => [...prev, {
      sender: "You",
      text: chatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setChatInput('');
  };

  const handleToggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
  };

  return (
    <div className="fixed inset-0 z-40 bg-[#07080a] flex overflow-hidden font-sans">
      {/* Main Calling Frame */}
      <div className="flex-1 flex flex-col relative h-full min-w-0">
        
        {/* Call Info Header */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/5">
          <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-semibold text-gray-200">
            {activeCall.status === 'ringing' ? 'Connecting...' : 'Secure HD Call'}
          </span>
          <span className="text-xs text-gray-400 border-l border-white/10 pl-2">
            {activeCall.user?.name}
          </span>
        </div>

        {/* Video Grid Space */}
        <div className="flex-1 p-6 flex items-center justify-center relative overflow-hidden">
          {/* Main Feed Container (Remote User) */}
          <div className="w-full h-full relative rounded-2xl overflow-hidden bg-radial from-indigo-950/20 to-[#0b0c10] border border-white/5 flex items-center justify-center">
            
            {/* Conditional Screen Share Simulation */}
            {isScreenSharing ? (
              <div className="w-full h-full bg-[#14161f] flex flex-col font-mono text-xs text-left p-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2 text-gray-500 shrink-0">
                  <span>workspace_redesign.jsx - Visual Studio Code (Screen Share)</span>
                  <div className="flex gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto space-y-1 text-indigo-300">
                  <p><span className="text-gray-500">1</span> <span className="text-violet-400">import</span> React, &#123; useState, useEffect &#125; <span className="text-violet-400">from</span> <span className="text-emerald-400">'react'</span>;</p>
                  <p><span className="text-gray-500">2</span> <span className="text-violet-400">import</span> &#123; motion &#125; <span className="text-violet-400">from</span> <span className="text-emerald-400">'framer-motion'</span>;</p>
                  <p><span className="text-gray-500">3</span> </p>
                  <p><span className="text-gray-500">4</span> <span className="text-violet-400">export default function</span> <span className="text-yellow-300">EchoMeetCall</span>() &#123;</p>
                  <p><span className="text-gray-500">5</span>   <span className="text-violet-400">const</span> [connected, setConnected] = <span className="text-yellow-300">useState</span>(<span className="text-amber-400">true</span>);</p>
                  <p><span className="text-gray-500">6</span>   <span className="text-violet-400">return</span> (</p>
                  <p><span className="text-gray-500">7</span>     &lt;<span className="text-violet-400">div</span> <span className="text-amber-400">className</span>=<span className="text-emerald-400">"webrtc-stream-grid"</span>&gt;</p>
                  <p><span className="text-gray-500">8</span>       &lt;<span className="text-violet-400">VideoFeed</span> <span className="text-amber-400">hd</span>=&#123;<span className="text-amber-400">true</span>&#125; <span className="text-amber-400">latency</span>=&#123;<span className="text-amber-400">0</span>&#125; /&gt;</p>
                  <p><span className="text-gray-500">9</span>     &lt;/<span className="text-violet-400">div</span>&gt;</p>
                  <p><span className="text-gray-500">10</span>   );</p>
                  <p><span className="text-gray-500">11</span> &#125;</p>
                </div>
              </div>
            ) : (
              /* Remote Video/Avatar View */
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                {/* Simulated Webcam Video Feed */}
                <div className={`absolute inset-0 transition-all duration-500 ${isBgBlurred ? 'blur-2xl opacity-60 scale-105' : 'opacity-85'}`}>
                  <img 
                    src={activeCall.user?.avatar} 
                    className="w-full h-full object-cover" 
                    alt="Webcam" 
                  />
                </div>
                
                {/* Active Speaker Ring Overlay if speaking */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
                
                {/* Ring Indicator */}
                {activeCall.status === 'ringing' && (
                  <div className="relative z-10 flex flex-col items-center gap-4">
                    <div className="h-16 w-16 bg-white/5 rounded-full border border-white/10 flex items-center justify-center animate-spin">
                      <span className="h-3 w-3 bg-indigo-500 rounded-full" />
                    </div>
                    <span className="text-xs text-gray-400">Ringing @{activeCall.user?.username}...</span>
                  </div>
                )}
              </div>
            )}
            
            {/* Participant Name Badge */}
            <div className="absolute bottom-4 left-4 z-10 bg-black/50 backdrop-blur px-3 py-1.5 rounded-lg border border-white/5 text-[10px] font-semibold text-gray-200">
              {isScreenSharing ? "Screen Shared by you" : activeCall.user?.name}
            </div>

            {/* Self Video PIP (Floating Box) */}
            <div className="absolute bottom-4 right-4 w-40 aspect-[16/10] bg-[#14161f]/90 border border-white/10 rounded-xl overflow-hidden z-20 shadow-2xl">
              {isCameraOff ? (
                <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 p-3 text-center">
                  <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-gray-500">
                    <VideoOff className="h-4 w-4" />
                  </div>
                  <span className="text-[9px] text-gray-400 font-semibold truncate max-w-full">Camera Off</span>
                </div>
              ) : (
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Selfie simulated webcam */}
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80" 
                    className="absolute inset-0 w-full h-full object-cover" 
                    alt="Selfie" 
                  />
                  <div className="absolute bottom-1.5 left-1.5 bg-black/40 px-1.5 py-0.5 rounded text-[8px] font-semibold backdrop-blur">
                    You
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Toolbar - Controls */}
        <div className="h-20 bg-[#07080a]/90 backdrop-blur-md border-t border-white/5 flex items-center justify-between px-6 shrink-0 z-30">
          {/* Side panel toggles */}
          <div className="flex gap-2">
            <button
              onClick={() => setSidebarView(sidebarView === 'participants' ? null : 'participants')}
              className={`h-11 px-3 rounded-xl border flex items-center gap-2 text-xs font-semibold transition-all cursor-pointer ${
                sidebarView === 'participants' 
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-md' 
                  : 'bg-white/5 border-white/5 text-gray-400 hover:text-gray-200'
              }`}
            >
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Participants</span>
            </button>
            <button
              onClick={() => setSidebarView(sidebarView === 'chat' ? null : 'chat')}
              className={`h-11 px-3 rounded-xl border flex items-center gap-2 text-xs font-semibold transition-all cursor-pointer ${
                sidebarView === 'chat' 
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-md' 
                  : 'bg-white/5 border-white/5 text-gray-400 hover:text-gray-200'
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Chat</span>
            </button>
          </div>

          {/* Core Controls */}
          <div className="flex items-center gap-3">
            {/* Mic Toggle */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`h-12 w-12 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                isMuted 
                  ? 'bg-red-600/90 border-red-500/20 text-white shadow-lg shadow-red-600/10 hover:bg-red-600' 
                  : 'bg-white/5 border-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
              title={isMuted ? "Unmute Mic" : "Mute Mic"}
            >
              {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>

            {/* Camera Toggle */}
            <button
              onClick={() => setIsCameraOff(!isCameraOff)}
              className={`h-12 w-12 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                isCameraOff 
                  ? 'bg-red-600/90 border-red-500/20 text-white shadow-lg shadow-red-600/10 hover:bg-red-600' 
                  : 'bg-white/5 border-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
              title={isCameraOff ? "Turn Camera On" : "Turn Camera Off"}
            >
              {isCameraOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
            </button>

            {/* Screen Share */}
            <button
              onClick={handleToggleScreenShare}
              className={`h-12 w-12 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                isScreenSharing 
                  ? 'bg-indigo-600 border-indigo-500/20 text-white shadow-lg shadow-indigo-600/10 hover:bg-indigo-500' 
                  : 'bg-white/5 border-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
              title={isScreenSharing ? "Stop sharing" : "Share screen"}
            >
              <Monitor className="h-5 w-5" />
            </button>

            {/* Blur BG */}
            <button
              onClick={() => setIsBgBlurred(!isBgBlurred)}
              className={`h-12 w-12 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                isBgBlurred 
                  ? 'bg-violet-600 border-violet-500/20 text-white shadow-lg shadow-violet-600/10 hover:bg-violet-500' 
                  : 'bg-white/5 border-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
              title="Toggle Virtual Background Blur"
            >
              <Sparkles className="h-5 w-5" />
            </button>
          </div>

          {/* End Call Button */}
          <div>
            <button
              onClick={declineCall}
              className="h-12 px-6 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-red-600/10"
              title="Leave call"
            >
              <PhoneOff className="h-4.5 w-4.5" />
              <span className="hidden sm:inline">Leave Meeting</span>
            </button>
          </div>
        </div>
      </div>

      {/* Side drawer panels (Chat/Participants) */}
      <AnimatePresence>
        {sidebarView && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 340, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="border-l border-white/5 bg-[#0b0c10] flex flex-col h-full shrink-0 z-30"
          >
            {/* Header */}
            <div className="h-16 px-6 border-b border-white/5 flex items-center justify-between shrink-0">
              <h3 className="text-xs font-bold text-gray-200 uppercase tracking-widest">
                {sidebarView === 'chat' ? 'In-Call Chat' : 'Participants'}
              </h3>
              <button
                onClick={() => setSidebarView(null)}
                className="text-gray-400 hover:text-gray-200 p-1.5 rounded-lg hover:bg-white/5 transition-all cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Panel Body */}
            <div className="flex-1 overflow-y-auto p-4">
              {sidebarView === 'participants' ? (
                /* Participants List */
                <div className="space-y-4">
                  {/* You */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img 
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80" 
                        className="h-8 w-8 rounded-full object-cover" 
                        alt="You" 
                      />
                      <div className="text-left">
                        <span className="text-xs font-semibold text-gray-200">Sanesh Kumar</span>
                        <p className="text-[9px] text-gray-500">Host, You</p>
                      </div>
                    </div>
                    <div className="flex gap-1 text-gray-500">
                      {isMuted ? <MicOff className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5 text-indigo-400" />}
                    </div>
                  </div>

                  {/* Remote user */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img 
                        src={activeCall.user?.avatar} 
                        className="h-8 w-8 rounded-full object-cover" 
                        alt="Caller" 
                      />
                      <div className="text-left">
                        <span className="text-xs font-semibold text-gray-200">{activeCall.user?.name}</span>
                        <p className="text-[9px] text-gray-500">Guest</p>
                      </div>
                    </div>
                    <div className="flex gap-1 text-gray-400">
                      <Mic className="h-3.5 w-3.5 text-indigo-400" />
                    </div>
                  </div>
                </div>
              ) : (
                /* In Call Chat Messages */
                <div className="h-full flex flex-col justify-between">
                  <div className="flex-1 overflow-y-auto space-y-3.5 pr-1">
                    {callMessages.map((msg, idx) => (
                      <div key={idx} className="text-left text-xs">
                        <div className="flex items-baseline justify-between mb-0.5">
                          <span className="font-bold text-indigo-400">{msg.sender}</span>
                          <span className="text-[9px] text-gray-500">{msg.time}</span>
                        </div>
                        <p className="text-gray-300 leading-relaxed bg-white/5 p-2 rounded-lg border border-white/5">{msg.text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Quick message input */}
                  <form onSubmit={handleSendCallMsg} className="flex gap-2 pt-4 border-t border-white/5">
                    <input
                      type="text"
                      placeholder="Send message to room..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      className="flex-1 bg-white/5 border border-white/5 focus:border-indigo-500 rounded-lg px-3 py-2 text-xs text-gray-200 focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={!chatInput.trim()}
                      className="h-9 w-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center cursor-pointer shrink-0 disabled:opacity-40"
                    >
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
