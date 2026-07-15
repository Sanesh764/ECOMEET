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
    <div className="h-full overflow-y-auto p-6 space-y-8">
      {/* Welcome Banner */}
      <div className="relative rounded-2xl overflow-hidden p-6 bg-gradient-to-r from-indigo-900/40 via-violet-950/20 to-black/10 border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-100">
            Welcome back, {user?.name || 'Sanesh Kumar'}
          </h2>
          <p className="text-xs text-gray-400 mt-1 max-w-lg">
             Redesign complete. All calling services, socket relays, and interface modules are active and optimized.
          </p>
        </div>
        <div className="shrink-0 flex gap-2">
          <Button variant="glass" size="sm" icon={CheckCircle2}>
            Status: Active
          </Button>
        </div>
      </div>

      {/* Quick Action Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Action 1 */}
        <button
          onClick={handleCreateMeeting}
          className="flex flex-col items-start text-left p-5 rounded-2xl border border-white/5 bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 hover:-translate-y-1 transition-all cursor-pointer group"
        >
          <div className="h-10 w-10 rounded-xl bg-white/10 text-white flex items-center justify-center mb-6">
            <Plus className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-semibold text-white">New Meeting</h3>
          <p className="text-[11px] text-indigo-200 mt-1">Start an instant video room</p>
        </button>

        {/* Action 2 */}
        <button
          onClick={() => setJoinModalOpen(true)}
          className="flex flex-col items-start text-left p-5 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 hover:-translate-y-1 transition-all cursor-pointer group"
        >
          <div className="h-10 w-10 rounded-xl bg-white/5 text-indigo-400 flex items-center justify-center mb-6 group-hover:text-indigo-300">
            <Keyboard className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-semibold text-gray-200">Join Meeting</h3>
          <p className="text-[11px] text-gray-400 mt-1">Enter a meeting code or link</p>
        </button>

        {/* Action 3 */}
        <button
          onClick={() => {}}
          className="flex flex-col items-start text-left p-5 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 hover:-translate-y-1 transition-all cursor-pointer group"
        >
          <div className="h-10 w-10 rounded-xl bg-white/5 text-violet-400 flex items-center justify-center mb-6 group-hover:text-violet-300">
            <Calendar className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-semibold text-gray-200">Schedule</h3>
          <p className="text-[11px] text-gray-400 mt-1">Plan calendar appointments</p>
        </button>

        {/* Action 4 */}
        <button
          onClick={() => {}}
          className="flex flex-col items-start text-left p-5 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 hover:-translate-y-1 transition-all cursor-pointer group"
        >
          <div className="h-10 w-10 rounded-xl bg-white/5 text-emerald-400 flex items-center justify-center mb-6 group-hover:text-emerald-300">
            <Monitor className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-semibold text-gray-200">Share Screen</h3>
          <p className="text-[11px] text-gray-400 mt-1">Present directly to an active call</p>
        </button>
      </div>

      {/* Main Grid content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Active Contacts */}
        <Card className="lg:col-span-2 flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Active Contacts</h3>
            <span className="text-[10px] font-semibold bg-white/5 px-2 py-0.5 rounded-full text-gray-400">
              {onlineContacts.length} online
            </span>
          </div>

          <div className="divide-y divide-white/5">
            {contacts.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative shrink-0">
                    <img 
                      src={contact.avatar} 
                      className="h-10 w-10 rounded-full object-cover border border-white/5" 
                      alt={contact.name} 
                    />
                    <span className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border border-[#14161f] ${
                      contact.status === 'online' ? 'bg-green-500' :
                      contact.status === 'idle' ? 'bg-amber-500' :
                      contact.status === 'dnd' ? 'bg-red-500' : 'bg-gray-500'
                    }`} />
                  </div>
                  <div className="min-w-0 text-left">
                    <h4 className="text-sm font-semibold text-gray-200 truncate">{contact.name}</h4>
                    <p className="text-xs text-gray-400 truncate">{contact.bio}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="cursor-pointer"
                    onClick={() => {
                      setActiveContactId(contact.id);
                      setDashboardView('chat');
                    }}
                  >
                    Chat
                  </Button>
                  
                  {contact.status !== 'offline' && (
                    <button
                      onClick={() => startCall(contact.id)}
                      className="h-8 w-8 rounded-lg bg-indigo-600/10 hover:bg-indigo-600 hover:text-white text-indigo-400 flex items-center justify-center transition-all cursor-pointer border border-indigo-500/10"
                      title={`Call ${contact.name}`}
                    >
                      <PhoneCall className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Right Column: Upcomings / Schedule */}
        <div className="flex flex-col gap-6">
          <Card className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Upcoming Meetings</h3>
            
            <div className="space-y-3">
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex gap-3 text-left">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-indigo-500/15 border border-indigo-500/10 flex items-center justify-center text-indigo-400">
                  <Calendar className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-200">Daily Redesign Standup</h4>
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-1">
                    <Clock className="h-3 w-3" />
                    <span>In 15 minutes</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex gap-3 text-left opacity-60">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-violet-500/15 border border-violet-500/10 flex items-center justify-center text-violet-400">
                  <Calendar className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-200">Linear sync & review</h4>
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-1">
                    <Clock className="h-3 w-3" />
                    <span>Tomorrow at 10:30 AM</span>
                  </div>
                </div>
              </div>
            </div>
            
            <Button variant="ghost" size="sm" className="w-full text-xs" icon={ArrowRight}>
              View Calendar
            </Button>
          </Card>
        </div>
      </div>

      {/* Join Meeting Modal */}
      <Modal
        isOpen={joinModalOpen}
        onClose={() => setJoinModalOpen(false)}
        title="Join Meeting"
        size="sm"
      >
        <form onSubmit={handleJoinMeeting} className="space-y-4">
          <Input
            label="Meeting Code or Link"
            placeholder="e.g. abc-defg-hij"
            required
            value={meetingCode}
            onChange={(e) => setMeetingCode(e.target.value)}
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" type="button" onClick={() => setJoinModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Join Room
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
