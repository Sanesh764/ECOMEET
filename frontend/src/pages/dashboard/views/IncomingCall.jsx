import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Phone, PhoneOff, Video } from 'lucide-react';
import { motion } from 'framer-motion';

export default function IncomingCall() {
  const { activeCall, acceptCall, declineCall } = useApp();

  if (!activeCall) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      {/* Concentric Pulsing background waves */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 bg-indigo-500/10 rounded-full animate-ping absolute" />
        <div className="w-80 h-80 bg-indigo-500/5 rounded-full animate-ping absolute" style={{ animationDelay: '0.7s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="w-full max-w-sm glassmorphic-card rounded-2xl p-8 border border-white/10 shadow-2xl relative z-10 flex flex-col items-center text-center gap-6"
      >
        {/* Ring Icon */}
        <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest animate-pulse">
          <Video className="h-3 w-3" />
          <span>Incoming Call</span>
        </div>

        {/* User Info with Glowing Avatar */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-indigo-500/30 blur-md animate-pulse" />
            <img
              src={activeCall.user?.avatar}
              className="h-20 w-20 rounded-full object-cover border-2 border-indigo-500 relative z-10"
              alt="Caller"
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-100">{activeCall.user?.name}</h3>
            <p className="text-xs text-gray-400 mt-1">is calling you on EchoMeet...</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-6 w-full justify-center mt-2">
          {/* Reject Call */}
          <button
            onClick={declineCall}
            className="h-14 w-14 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg shadow-red-600/20 hover:scale-105 active:scale-95"
            title="Decline Call"
          >
            <PhoneOff className="h-5 w-5" />
          </button>
          
          {/* Answer Call */}
          <button
            onClick={acceptCall}
            className="h-14 w-14 rounded-full bg-green-600 hover:bg-green-500 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg shadow-green-600/20 hover:scale-105 active:scale-95"
            title="Answer Call"
          >
            <Phone className="h-5 w-5 fill-current animate-bounce" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
