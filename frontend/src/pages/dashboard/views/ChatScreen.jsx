import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { 
  Search, 
  Phone, 
  Video, 
  Smile, 
  Paperclip, 
  Mic, 
  Send,
  MoreVertical,
  CheckCheck,
  Check,
  Play,
  Volume2
} from 'lucide-react';

export default function ChatScreen() {
  const { 
    contacts, 
    activeContactId, 
    setActiveContactId, 
    messages, 
    sendMessage,
    startCall 
  } = useApp();

  const [inputVal, setInputVal] = useState('');
  const [searchVal, setSearchVal] = useState('');
  const [isTypingReply, setIsTypingReply] = useState(false);
  const threadEndRef = useRef(null);

  const activeContact = contacts.find(c => c.id === activeContactId) || contacts[0];
  const activeChatMessages = messages[activeContact?.id] || [];

  // Filter contacts by search query
  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchVal.toLowerCase()) ||
    c.username.toLowerCase().includes(searchVal.toLowerCase())
  );

  // Scroll to bottom
  const scrollToBottom = () => {
    threadEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChatMessages, isTypingReply]);

  // Handle typing simulation
  const handleSend = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    
    sendMessage(inputVal);
    setInputVal('');
    
    // Simulate typing indicator for the remote user
    setIsTypingReply(true);
    setTimeout(() => {
      setIsTypingReply(false);
    }, 2000);
  };

  return (
    <div className="h-full flex overflow-hidden bg-[#07080a] relative">
      {/* Left panel: Contacts List */}
      <div className="w-80 border-r border-white/5 bg-[#0b0c10]/40 flex flex-col h-full shrink-0">
        {/* Search */}
        <div className="p-4 border-b border-white/5">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search chat or friends..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="w-full bg-white/5 border border-white/5 focus:border-indigo-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>
        </div>

        {/* Contacts */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredContacts.map((contact) => {
            const isSelected = contact.id === activeContact?.id;
            const contactMsgs = messages[contact.id] || [];
            const lastMsg = contactMsgs[contactMsgs.length - 1];

            return (
              <button
                key={contact.id}
                onClick={() => setActiveContactId(contact.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left cursor-pointer ${
                  isSelected 
                    ? 'bg-white/5 border border-white/10' 
                    : 'hover:bg-white/[0.02] border border-transparent'
                }`}
              >
                <div className="relative shrink-0">
                  <img 
                    src={contact.avatar} 
                    className="h-10 w-10 rounded-full object-cover border border-white/5" 
                    alt={contact.name} 
                  />
                  <span className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border border-[#07080a] ${
                    contact.status === 'online' ? 'bg-green-500' :
                    contact.status === 'idle' ? 'bg-amber-500' :
                    contact.status === 'dnd' ? 'bg-red-500' : 'bg-gray-500'
                  }`} />
                </div>
                
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h4 className="text-xs font-semibold text-gray-200 truncate">{contact.name}</h4>
                    <span className="text-[9px] text-gray-500">
                      {lastMsg ? lastMsg.timestamp : ''}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 truncate">
                    {lastMsg ? lastMsg.text : contact.bio}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right panel: Active Chat Thread */}
      <div className="flex-1 flex flex-col h-full bg-[#0b0c10]/20">
        {/* Header */}
        <div className="h-16 px-6 border-b border-white/5 flex items-center justify-between shrink-0 bg-[#0b0c10]/40">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <img 
                src={activeContact?.avatar} 
                className="h-9 w-9 rounded-full object-cover border border-white/10" 
                alt="Active Avatar" 
              />
              <span className={`absolute bottom-0 right-0 h-2 w-2 rounded-full border border-[#0b0c10] ${
                activeContact?.status === 'online' ? 'bg-green-500' :
                activeContact?.status === 'idle' ? 'bg-amber-500' :
                activeContact?.status === 'dnd' ? 'bg-red-500' : 'bg-gray-500'
              }`} />
            </div>
            
            <div className="text-left">
              <h4 className="text-xs font-bold text-gray-200">{activeContact?.name}</h4>
              <p className="text-[10px] text-gray-400 mt-0.5">
                {activeContact?.status === 'online' ? 'Active now' :
                 activeContact?.status === 'idle' ? 'Away' :
                 activeContact?.status === 'dnd' ? 'Do not disturb' : 'Offline'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => startCall(activeContact?.id)}
              className="h-8 w-8 rounded-lg bg-indigo-600/10 text-indigo-400 border border-indigo-500/10 hover:bg-indigo-600 hover:text-white flex items-center justify-center transition-all cursor-pointer"
              title="Start Video Call"
            >
              <Video className="h-4 w-4" />
            </button>
            <button
              onClick={() => startCall(activeContact?.id)}
              className="h-8 w-8 rounded-lg bg-white/5 text-gray-400 hover:text-gray-200 flex items-center justify-center transition-all cursor-pointer"
              title="Start Voice Call"
            >
              <Phone className="h-4 w-4" />
            </button>
            <button className="h-8 w-8 rounded-lg bg-white/5 text-gray-400 hover:text-gray-200 flex items-center justify-center transition-all cursor-pointer">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {activeChatMessages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-500">
                <Smile className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-300">No messages yet</h4>
                <p className="text-xs text-gray-500 mt-1">Send a message to start conversation with {activeContact?.name}</p>
              </div>
            </div>
          ) : (
            activeChatMessages.map((msg) => {
              const isSelf = msg.senderId === 'user';
              return (
                <div 
                  key={msg.id}
                  className={`flex ${isSelf ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-md flex flex-col gap-1 ${isSelf ? 'items-end' : 'items-start'}`}>
                    <div 
                      className={`px-4 py-3 rounded-2xl text-xs leading-relaxed ${
                        isSelf 
                          ? 'bg-indigo-600 text-white rounded-tr-none' 
                          : 'bg-white/5 border border-white/5 text-gray-200 rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                    
                    <div className="flex items-center gap-1.5 text-[9px] text-gray-500 px-1 mt-0.5">
                      <span>{msg.timestamp}</span>
                      {isSelf && (
                        msg.seen ? (
                          <CheckCheck className="h-3 w-3 text-indigo-400" />
                        ) : (
                          <Check className="h-3 w-3 text-gray-500" />
                        )
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {/* Voice message UI display representation */}
          {activeContact?.id === '1' && (
            <div className="flex justify-start">
              <div className="max-w-md flex flex-col gap-1 items-start">
                <div className="px-4 py-3.5 rounded-2xl bg-white/5 border border-white/5 rounded-tl-none flex items-center gap-3">
                  <button className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center cursor-pointer hover:bg-indigo-500 transition-colors shrink-0">
                    <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                  </button>
                  <div className="flex flex-col gap-1 text-left">
                    {/* Simulated Voice wave */}
                    <div className="flex items-center gap-0.5 h-6">
                      <div className="w-0.75 h-3 bg-indigo-400 rounded-full" />
                      <div className="w-0.75 h-4 bg-indigo-400 rounded-full animate-pulse-slow" />
                      <div className="w-0.75 h-5 bg-indigo-400 rounded-full" />
                      <div className="w-0.75 h-2 bg-indigo-400 rounded-full" />
                      <div className="w-0.75 h-4 bg-indigo-400 rounded-full" />
                      <div className="w-0.75 h-6 bg-indigo-400 rounded-full" />
                      <div className="w-0.75 h-3 bg-indigo-400 rounded-full" />
                      <div className="w-0.75 h-5 bg-indigo-400 rounded-full animate-pulse-slow" />
                      <div className="w-0.75 h-2 bg-indigo-400 rounded-full" />
                      <div className="w-0.75 h-4 bg-indigo-400 rounded-full" />
                    </div>
                    <span className="text-[9px] text-gray-500 flex items-center gap-1">
                      <Volume2 className="h-2.5 w-2.5" />
                      Voice message (0:14)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Typing Indicator */}
          {isTypingReply && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1 bg-white/5 border border-white/5 px-4 py-3 rounded-2xl rounded-tl-none">
                <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          <div ref={threadEndRef} />
        </div>

        {/* Message Input Form */}
        <div className="p-4 border-t border-white/5 bg-[#0b0c10]/40 shrink-0">
          <form onSubmit={handleSend} className="flex items-center gap-2">
            <button
              type="button"
              className="h-11 w-11 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-gray-200 flex items-center justify-center transition-all cursor-pointer shrink-0"
              title="Add attachment"
            >
              <Paperclip className="h-4.5 w-4.5" />
            </button>
            <button
              type="button"
              className="h-11 w-11 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-gray-200 flex items-center justify-center transition-all cursor-pointer shrink-0"
              title="Pick emoji"
            >
              <Smile className="h-4.5 w-4.5" />
            </button>

            <input
              type="text"
              placeholder={`Message @${activeContact?.username}...`}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 bg-white/5 border border-white/5 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />

            <button
              type="button"
              className="h-11 w-11 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-gray-200 flex items-center justify-center transition-all cursor-pointer shrink-0"
              title="Record voice message"
            >
              <Mic className="h-4.5 w-4.5" />
            </button>
            
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="h-11 w-11 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
            >
              <Send className="h-4.5 w-4.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
