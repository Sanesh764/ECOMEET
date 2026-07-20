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
    <h1>video call screen</h1>
  );
}
