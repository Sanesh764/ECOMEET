import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

// Seed some beautiful mock contacts
const INITIAL_CONTACTS = [
  {
    id: "1",
    name: "Sanesh Kumar",
    username: "sanesh",
    status: "online",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    bio: "Full Stack Developer"
  },
  {
    id: "2",
    name: "Aarav Sharma",
    username: "aarav",
    status: "online",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80",
    bio: "Frontend Developer"
  },
  {
    id: "3",
    name: "Priya Singh",
    username: "priya",
    status: "idle",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
    bio: "UI/UX Designer"
  },
  {
    id: "4",
    name: "Rohan Verma",
    username: "rohan",
    status: "dnd",
    avatar: "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=200&auto=format&fit=crop&q=80",
    bio: "Backend Engineer"
  },
  {
    id: "5",
    name: "Ananya Gupta",
    username: "ananya",
    status: "offline",
    avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200&auto=format&fit=crop&q=80",
    bio: "Software Engineer"
  }
];

const INITIAL_MESSAGES = {
  "1": [
    {
      id: "m1",
      senderId: "1",
      text: "Hi Sanesh! How's the video calling project going?",
      timestamp: "3:45 PM",
      seen: true
    },
    {
      id: "m2",
      senderId: "user",
      text: "It's going well. I'm redesigning the frontend and adding chat, screen sharing, and video call features.",
      timestamp: "3:47 PM",
      seen: true
    },
    {
      id: "m3",
      senderId: "1",
      text: "Awesome! Let's do a video call later and review the UI together.",
      timestamp: "3:49 PM",
      seen: true
    }
  ],

  "2": [
    {
      id: "m4",
      senderId: "2",
      text: "Hey, did you finish the responsive login page?",
      timestamp: "1:15 PM",
      seen: true
    },
    {
      id: "m5",
      senderId: "user",
      text: "Almost done. I'm polishing the animations and improving the user experience.",
      timestamp: "1:18 PM",
      seen: true
    }
  ],

  "3": [
    {
      id: "m6",
      senderId: "3",
      text: "Your dashboard looks really clean. Great work!",
      timestamp: "Yesterday",
      seen: true
    },
    {
      id: "m7",
      senderId: "user",
      text: "Thanks! Next I'm working on the meeting room interface.",
      timestamp: "Yesterday",
      seen: true
    }
  ],

  "4": [
    {
      id: "m8",
      senderId: "4",
      text: "Can we schedule a demo for tomorrow?",
      timestamp: "10:30 AM",
      seen: true
    },
    {
      id: "m9",
      senderId: "user",
      text: "Sure! I'll send you the meeting link in the morning.",
      timestamp: "10:32 AM",
      seen: true
    }
  ],

  "5": [
    {
      id: "m10",
      senderId: "5",
      text: "I'm offline right now. Leave a message and I'll reply later.",
      timestamp: "Monday",
      seen: false
    }
  ]
};

export const AppProvider = ({ children }) => {
  // Navigation State
  const [route, setRoute] = useState('landing'); // 'landing', 'login', 'register', 'forgot-password', 'dashboard'
  const [dashboardView, setDashboardView] = useState('home'); // 'home', 'chat', 'settings'
  
  // User Session
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  // App Data State
  const [contacts, setContacts] = useState(INITIAL_CONTACTS);
  const [activeContactId, setActiveContactId] = useState('1');
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  
  // Calling State
  const [activeCall, setActiveCall] = useState(null); // null, or { status: 'ringing'|'connected', isIncoming: boolean, user: contact_object }
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isBgBlurred, setIsBgBlurred] = useState(false);
  
  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 'n1', title: 'New Redesign Feedback', description: 'Alexander Wright loved the new theme!', time: '10m ago', read: false },
    { id: 'n2', title: 'Call Missed', description: 'Sophia Chen tried to call you.', time: '1h ago', read: true }
  ]);

  // Backend URL Detection
  const BACKEND_URL = 'http://localhost:8000/api/v1/user';

  // API - Login User
  const login = async (username, password) => {
    setLoading(true);
    setAuthError(null);
    try {
      const response = await fetch(`${BACKEND_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.data.user);
        setRoute('dashboard');
        setLoading(false);
        return { success: true };
      } else {
        throw new Error(data.message || 'Login credentials incorrect');
      }
    } catch (err) {
      console.warn('API Error, falling back to mock login:', err.message);
      // Simulation mode
      return new Promise((resolve) => {
        setTimeout(() => {
          setUser({
            id: 'user',
            username: username || 'demo_user',
            name: 'Sanesh Kumar',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
            bio: 'Frontend redesigner | React Expert',
            email: 'sanesh@echomeet.io'
          });
          setRoute('dashboard');
          setLoading(false);
          resolve({ success: true, simulated: true });
        }, 1000);
      });
    }
  };

  // API - Register User
  const register = async (name, username, password) => {
    setLoading(true);
    setAuthError(null);
    try {
      const response = await fetch(`${BACKEND_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, username, password })
      });
      const data = await response.json();
      if (response.ok) {
        setLoading(false);
        // Navigate to login
        setRoute('login');
        return { success: true };
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    } catch (err) {
      console.warn('API Error, falling back to mock registration:', err.message);
      return new Promise((resolve) => {
        setTimeout(() => {
          setLoading(false);
          setRoute('login');
          resolve({ success: true, simulated: true });
        }, 1000);
      });
    }
  };

  // API - Logout User
  const logout = async () => {
    setLoading(true);
    try {
      await fetch(`${BACKEND_URL}/logout`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer mock-or-real-token`
        }
      });
    } catch (err) {
      console.warn('API logout failed, performing local logout.');
    }
    setUser(null);
    setRoute('landing');
    setLoading(false);
  };

  // Actions: Chat Sending
  const sendMessage = (text) => {
    if (!text.trim() || !activeContactId) return;
    const newMsg = {
      id: `m_${Date.now()}`,
      senderId: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      seen: false
    };
    
    setMessages(prev => ({
      ...prev,
      [activeContactId]: [...(prev[activeContactId] || []), newMsg]
    }));

    // Trigger mock response after a delay
    setTimeout(() => {
      const activeContact = contacts.find(c => c.id === activeContactId);
      const responses = [
        "That is awesome! Keep going.",
        "Could you show me a demo?",
        "Sounds good to me!",
        "Awesome, let me check that out.",
        "Oh, perfect. I will let the rest of the team know.",
        "Wait, what about the mobile layout?"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const mockReply = {
        id: `m_${Date.now() + 1}`,
        senderId: activeContactId,
        text: randomResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        seen: true
      };

      setMessages(prev => ({
        ...prev,
        [activeContactId]: [...(prev[activeContactId] || []), mockReply]
      }));
    }, 2000);
  };

  // Actions: Calling Operations
  const startCall = (contactId) => {
    const contact = contacts.find(c => c.id === contactId) || contacts[0];
    setActiveCall({
      status: 'ringing',
      isIncoming: false,
      user: contact
    });

    // Simulate connection after 3.5s
    setTimeout(() => {
      setActiveCall(prev => {
        if (prev && prev.status === 'ringing') {
          return { ...prev, status: 'connected' };
        }
        return prev;
      });
    }, 3500);
  };

  const receiveCall = (contactId) => {
    const contact = contacts.find(c => c.id === contactId) || contacts[0];
    setActiveCall({
      status: 'ringing',
      isIncoming: true,
      user: contact
    });
  };

  const acceptCall = () => {
    setActiveCall(prev => prev ? { ...prev, status: 'connected' } : null);
  };

  const declineCall = () => {
    setActiveCall(null);
    setIsMuted(false);
    setIsCameraOff(false);
    setIsScreenSharing(false);
    setIsBgBlurred(false);
  };

  // Simulate an incoming call 15 seconds after dashboard load
  useEffect(() => {
    if (user && !activeCall) {
      const timer = setTimeout(() => {
        receiveCall('2'); // Sophia Chen calling
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        route,
        setRoute,
        dashboardView,
        setDashboardView,
        user,
        setUser,
        loading,
        authError,
        contacts,
        activeContactId,
        setActiveContactId,
        messages,
        sendMessage,
        activeCall,
        setActiveCall,
        startCall,
        acceptCall,
        declineCall,
        isMuted,
        setIsMuted,
        isCameraOff,
        setIsCameraOff,
        isScreenSharing,
        setIsScreenSharing,
        isBgBlurred,
        setIsBgBlurred,
        notifications,
        login,
        register,
        logout
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
