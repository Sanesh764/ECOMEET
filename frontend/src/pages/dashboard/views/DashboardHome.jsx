import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Modal from '../../../components/ui/Modal';
import Input from '../../../components/ui/Input';
import { 
  Video, 
  Plus, 
  Keyboard, 
  Calendar, 
  Monitor, 
  ArrowRight,
  PhoneCall,
  CheckCircle2,
  Clock
} from 'lucide-react';

export default function DashboardHome() {
  const { user, contacts, startCall, setDashboardView, setActiveContactId } = useApp();
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [meetingCode, setMeetingCode] = useState('');
  
  const onlineContacts = contacts.filter(c => c.status === 'online' || c.status === 'idle');

  const handleCreateMeeting = () => {
    // Generate random code and call alex (id 1)
    startCall('1');
  };

  const handleJoinMeeting = (e) => {
    e.preventDefault();
    if (!meetingCode.trim()) return;
    setJoinModalOpen(false);
    startCall('2'); // Join call with Sophia
  };

  return (
    <h1>dahsboard home</h1>
  );
}
