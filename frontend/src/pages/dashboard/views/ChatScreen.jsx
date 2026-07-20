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
    <h1>chatscreen</h1>
  );
}
