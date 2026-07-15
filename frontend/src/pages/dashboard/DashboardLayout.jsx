import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import DashboardHome from './views/DashboardHome';
import ChatScreen from './views/ChatScreen';
import ProfileSettings from './views/ProfileSettings';
import VideoCallScreen from './views/VideoCallScreen';
import IncomingCall from './views/IncomingCall';
import { 
  Home, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Video, 
  Menu,
  X,
  Bell
} from 'lucide-react';

export default function DashboardLayout() {
  const { 
    user, 
    logout, 
    dashboardView, 
    setDashboardView, 
    activeCall, 
    notifications 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(
    notifications.filter(n => !n.read).length
  );
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'chat', label: 'Chat & Calls', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="h-screen flex bg-[#07080a] text-gray-100 overflow-hidden font-sans relative">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-indigo-900/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-[#0b0c10] border-r border-white/5 shrink-0 select-none">
        {/* Brand header */}
        <div className="h-16 flex items-center px-6 border-b border-white/5 shrink-0 gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-md shadow-indigo-600/20">
            <Video className="h-4.5 w-4.5 text-white" />
          </div>
          <span className="font-bold tracking-tight text-gray-200">EchoMeet</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = dashboardView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setDashboardView(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10' 
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                <Icon className="h-4.5 w-4.5 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-white/5 bg-[#0b0c10]/80 shrink-0">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative shrink-0">
                <img 
                  src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80'} 
                  className="h-9 w-9 rounded-full object-cover border border-white/10" 
                  alt="Avatar" 
                />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border border-[#0b0c10]" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-semibold text-gray-200 truncate">{user?.name || 'Sanesh Kumar'}</h4>
                <p className="text-[10px] text-gray-500 truncate">@{user?.username || 'sanesh'}</p>
              </div>
            </div>
            
            <button
              onClick={logout}
              className="text-gray-400 hover:text-red-400 p-2 rounded-lg hover:bg-white/5 transition-all cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 border-b border-white/5 bg-[#0b0c10]/40 flex items-center justify-between px-6 shrink-0 z-30">
          <div className="flex items-center gap-3">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-gray-400 hover:text-gray-200 p-1.5 rounded-lg hover:bg-white/5 transition-all cursor-pointer"
            >
              <Menu className="h-5 w-5" />
            </button>
            
            <h1 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
              {navigationItems.find(n => n.id === dashboardView)?.label}
            </h1>
          </div>

          <div className="flex items-center gap-4 relative">
            {/* Notification Badge */}
            <button
              onClick={() => {
                setShowNotificationDropdown(!showNotificationDropdown);
                setUnreadNotificationsCount(0); // clear on click
              }}
              className="text-gray-400 hover:text-gray-200 p-2 rounded-lg hover:bg-white/5 relative transition-all cursor-pointer"
            >
              <Bell className="h-5 w-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-indigo-500 rounded-full" />
              )}
            </button>

            {/* Notification Dropdown */}
            <AnimatePresence>
              {showNotificationDropdown && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotificationDropdown(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-11 w-80 glassmorphic-card rounded-xl shadow-2xl p-4 border border-white/10 z-50 space-y-3"
                  >
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-white/5 pb-2">
                      Notifications
                    </h3>
                    <div className="space-y-2.5 max-h-60 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div key={notif.id} className="p-2 rounded-lg hover:bg-white/5 transition-colors text-left text-xs">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-gray-200">{notif.title}</span>
                            <span className="text-[9px] text-gray-500">{notif.time}</span>
                          </div>
                          <p className="text-gray-400 leading-snug">{notif.description}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            <img 
              src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80'} 
              className="h-8 w-8 rounded-full object-cover border border-white/10" 
              alt="Profile" 
            />
          </div>
        </header>

        {/* View Router */}
        <main className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={dashboardView}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full"
            >
              {dashboardView === 'home' && <DashboardHome />}
              {dashboardView === 'chat' && <ChatScreen />}
              {dashboardView === 'settings' && <ProfileSettings />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Drawer (Sidebar) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            {/* Drawer Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-72 bg-[#0b0c10] border-r border-white/5 flex flex-col h-full z-10"
            >
              {/* Header */}
              <div className="h-16 flex items-center justify-between px-6 border-b border-white/5 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center">
                    <Video className="h-4.5 w-4.5 text-white" />
                  </div>
                  <span className="font-bold tracking-tight text-white">EchoMeet</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-400 hover:text-gray-200 p-1.5 rounded-lg hover:bg-white/5 transition-all cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = dashboardView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setDashboardView(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                        isActive 
                          ? 'bg-indigo-600 text-white' 
                          : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                      }`}
                    >
                      <Icon className="h-4.5 w-4.5 shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* User profile */}
              <div className="p-4 border-t border-white/5 bg-[#0b0c10]/80 shrink-0">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img 
                      src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80'} 
                      className="h-9 w-9 rounded-full object-cover border border-white/10" 
                      alt="Avatar" 
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-semibold text-gray-200 truncate">{user?.name || 'Sanesh Kumar'}</h4>
                      <p className="text-[10px] text-gray-500 truncate">@{user?.username || 'sanesh'}</p>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="text-gray-400 hover:text-red-400 p-2 rounded-lg hover:bg-white/5 transition-all cursor-pointer"
                  >
                    <LogOut className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Incoming Call Overlay Notification */}
      {activeCall && activeCall.status === 'ringing' && activeCall.isIncoming && (
        <IncomingCall />
      )}

      {/* Video Call Full screen Overlay */}
      {activeCall && (activeCall.status === 'connected' || (activeCall.status === 'ringing' && !activeCall.isIncoming)) && (
        <VideoCallScreen />
      )}
    </div>
  );
}
