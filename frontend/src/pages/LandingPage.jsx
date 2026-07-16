import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { 
  Video, 
  MessageSquare, 
  Shield, 
  Zap, 
  Globe, 
  Users, 
  CheckCircle2, 
  ChevronDown, 
  ArrowRight, 
  Sparkles,
  Play
} from 'lucide-react';//must study

export default function LandingPage() {
  const { setRoute } = useApp();
  const [activeFaq, setActiveFaq] = useState(null);


  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };


  const features = [
  {
    icon: Video,
    title: "HD Video Meetings",
    description:
      "Experience crystal-clear HD video and high-quality audio with low latency. Perfect for online meetings, classes, interviews, and team collaboration."
  },
  {
    icon: MessageSquare,
    title: "Instant Team Chat",
    description:
      "Send messages instantly with emojis, file sharing, typing indicators, and message history to keep conversations organized."
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "All meetings and chats are protected with end-to-end encryption, ensuring your conversations remain safe and private."
  },
  {
    icon: Zap,
    title: "One-Click Screen Share",
    description:
      "Present your entire screen or a single application instantly for seamless collaboration and remote support."
  },
  {
    icon: Users,
    title: "Group Meetings",
    description:
      "Host team meetings, online classes, or family calls with multiple participants and smart speaker detection."
  },
  {
    icon: Globe,
    title: "Connect Anywhere",
    description:
      "Optimized servers provide fast and stable connections across India and around the world."
  }
];


const plans = [
  {
    name: "Free",
    price: "₹0",
    description: "Perfect for students, freelancers, and personal use.",
    features: [
      "40-minute meetings",
      "Up to 100 participants",
      "Unlimited chat",
      "Screen sharing",
      "HD video quality"
    ],
    cta: "Start Free",
    popular: false
  },
  {
    name: "Pro",
    price: "₹499/month",
    description: "Ideal for startups and growing teams.",
    features: [
      "Unlimited meeting duration",
      "Up to 300 participants",
      "Cloud recording",
      "Virtual backgrounds",
      "Meeting scheduling",
      "Priority support"
    ],
    cta: "Upgrade to Pro",
    popular: true
  },
  {
    name: "Business",
    price: "₹999/month",
    description: "Advanced features for businesses and organizations.",
    features: [
      "Unlimited participants",
      "Admin dashboard",
      "Team management",
      "Meeting analytics",
      "Custom branding",
      "24×7 priority support"
    ],
    cta: "Contact Sales",
    popular: false
  }
];


const testimonials = [
  {
    quote:
      "EchoMeet has become our primary communication platform. The interface is clean, fast, and incredibly easy to use.",
    author: "Rahul Sharma",
    role: "Software Engineer, Bengaluru",
    avatar:
      "../public/pic sanesh.jpg"
  },
  {
    quote:
      "The video quality and screen sharing are excellent. Our remote team collaborates much more efficiently now.",
    author: "Priya Verma",
    role: "Product Manager, Hyderabad",
    avatar:
      "https://ui-avatars.com/api/?name=Priya+Verma&background=7c3aed&color=fff"
  }
];


const faqs = [
  {
    q: "Is EchoMeet free to use?",
    a: "Yes. Our Free plan allows HD video meetings, messaging, and screen sharing at no cost."
  },
  {
    q: "Do I need to install any software?",
    a: "No. EchoMeet works directly in modern web browsers. Desktop and mobile apps are also available."
  },
  {
    q: "Are my meetings secure?",
    a: "Yes. All video calls, chats, and shared data are protected using end-to-end encryption and secure WebRTC technology."
  },
  {
    q: "Can I record meetings?",
    a: "Yes. Meeting recording is available in the Pro and Business plans."
  }
];
  return (
    <div className="min-h-screen bg-[#07080a] text-gray-100 flex flex-col selection:bg-indigo-600 selection:text-white">
      {/* Background Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-900/10 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-15%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-violet-950/15 blur-[150px] pointer-events-none" />

      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-[#07080a]/60 backdrop-blur-md border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-600/30">
              <Video className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              EchoMeet
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-gray-400 hover:text-gray-100 transition-colors">Features</a>
            <a href="#pricing" className="text-sm font-medium text-gray-400 hover:text-gray-100 transition-colors">Pricing</a>
            <a href="#faq" className="text-sm font-medium text-gray-400 hover:text-gray-100 transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setRoute('login')}>
              Sign In
            </Button>
            <Button variant="primary" size="sm" onClick={() => setRoute('register')}>
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-8"
        >
          <Sparkles className="h-3.5 w-3.5 animate-pulse" />
          <span>Introducing EchoMeet Redesign</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 max-w-4xl"
        >
          The premium standard for{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-500 bg-clip-text text-transparent">
            video meetings & chat.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed"
        >
          Host beautiful video calls, share ideas in high-fidelity chat, and collaborate with your teammates. All directly in your browser.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mb-20 z-10"
        >
          <Button variant="primary" size="lg" icon={ArrowRight} onClick={() => setRoute('register')}>
            Get Started Free
          </Button>
          <Button variant="secondary" size="lg" icon={Play} onClick={() => setRoute('login')}>
            Live Interactive Demo
          </Button>
        </motion.div>

        {/* Hero App Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-indigo-600/5 max-w-5xl group"
        >
          {/* Glass Overlay header */}
          <div className="bg-[#14161f]/80 backdrop-blur border-b border-white/5 px-4 py-3 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
            </div>
            <span className="font-mono text-[10px] tracking-widest uppercase">app.echomeet.io</span>
            <div className="w-12" />
          </div>
          
          {/* App preview image */}
          <div className="relative aspect-[16/10] bg-[#0b0c10] overflow-hidden flex items-center justify-center">
            {/* Embedded interactive simulator */}
            <div className="absolute inset-0 bg-[#0b0c10] flex text-left">
              {/* Sidebar */}
              <div className="w-16 sm:w-20 border-r border-white/5 bg-[#07080a] flex flex-col items-center py-4 gap-4">
                <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center">
                  <Video className="h-5 w-5 text-white" />
                </div>
                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center" />
                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center" />
              </div>
              
              {/* List panel */}
              <div className="hidden sm:block w-48 border-r border-white/5 bg-[#0b0c10] p-3">
                <div className="h-8 bg-white/5 rounded-lg mb-4" />
                <div className="space-y-2">
                  <div className="h-10 bg-white/10 rounded-lg" />
                  <div className="h-10 bg-white/5 rounded-lg" />
                  <div className="h-10 bg-white/5 rounded-lg" />
                </div>
              </div>
              
              {/* Main Call View */}
              <div className="flex-1 bg-[#14161f] p-4 flex flex-col">
                <div className="flex-1 grid grid-cols-2 gap-3 mb-4">
                  {/* Remote participant card */}
                  <div className="relative bg-[#1e2230] rounded-xl overflow-hidden flex items-center justify-center border border-white/5">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80" 
                      className="absolute inset-0 w-full h-full object-cover opacity-75"
                      alt="Alexander"
                    />
                    <div className="absolute bottom-2.5 left-2.5 bg-black/40 px-2 py-0.5 rounded text-[10px] font-semibold backdrop-blur-sm">
                      Alexander Wright
                    </div>
                  </div>
                  
                  {/* Self participant card */}
                  <div className="relative bg-[#1e2230] rounded-xl overflow-hidden flex items-center justify-center border border-white/5">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80" 
                      className="absolute inset-0 w-full h-full object-cover opacity-75"
                      alt="Sanesh"
                    />
                    <div className="absolute bottom-2.5 left-2.5 bg-black/40 px-2 py-0.5 rounded text-[10px] font-semibold backdrop-blur-sm">
                      Sanesh Kumar (You)
                    </div>
                  </div>
                </div>
                
                {/* Control bar */}
                <div className="h-14 bg-[#07080a]/60 border border-white/5 rounded-xl flex items-center justify-between px-4">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded bg-indigo-600/20 text-indigo-400" />
                    <div className="h-7 w-7 rounded bg-white/5" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-8 w-8 rounded-full bg-white/5" />
                    <div className="h-8 w-8 rounded-full bg-white/5" />
                    <div className="h-8 w-8 rounded-full bg-white/5" />
                    <div className="h-8 w-8 rounded-full bg-red-500/80" />
                  </div>
                  <div className="w-12" />
                </div>
              </div>
            </div>
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-[#07080a]/40 backdrop-blur-[2px] opacity-100 group-hover:opacity-0 transition-opacity duration-300 flex flex-col items-center justify-center cursor-pointer" onClick={() => setRoute('login')}>
              <div className="h-16 w-16 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-2xl shadow-indigo-600/30 scale-100 hover:scale-105 transition-transform duration-200">
                <Play className="h-6 w-6 fill-current ml-1" />
              </div>
              <p className="mt-4 text-xs font-semibold text-gray-300 uppercase tracking-widest">Click to launch app</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 border-t border-white/5 bg-[#0b0c10]/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Everything you need for clean communication
            </h2>
            <p className="text-gray-400">
              EchoMeet comes equipped with cutting-edge tools to facilitate perfect connection, whether you are chatting or video conferencing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <Card key={idx} hoverEffect={true} className="flex flex-col gap-4">
                <div className="h-11 w-11 rounded-xl bg-indigo-600/10 text-indigo-400 border border-indigo-500/10 flex items-center justify-center shrink-0">
                  <feature.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-100 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 max-w-5xl mx-auto px-6 text-center">
        <div className="flex justify-center gap-1 text-indigo-400 mb-6">
          <Sparkles className="h-5 w-5 fill-current" />
          <Sparkles className="h-5 w-5 fill-current" />
          <Sparkles className="h-5 w-5 fill-current" />
        </div>
        
        <p className="text-2xl md:text-3xl font-medium tracking-tight text-gray-200 mb-10 italic max-w-3xl mx-auto">
          "{testimonials[0].quote}"
        </p>
        
        <div className="flex items-center justify-center gap-3">
          <img src={testimonials[0].avatar} className="h-11 w-11 rounded-full object-cover border border-white/10" alt={testimonials[0].author} />
          <div className="text-left">
            <h4 className="text-sm font-semibold text-gray-200">{testimonials[0].author}</h4>
            <p className="text-xs text-gray-400">{testimonials[0].role}</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 border-t border-white/5 bg-[#0b0c10]/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Flexible tiers for every team size
            </h2>
            <p className="text-gray-400">
              Start completely free, then upgrade as your team scales. No hidden setup fees or contracts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, idx) => (
              <div 
                key={idx}
                className={`relative rounded-2xl p-8 transition-all duration-300 border ${
                  plan.popular 
                    ? 'bg-[#14161f]/80 border-indigo-500 shadow-xl shadow-indigo-600/5' 
                    : 'glassmorphic border-white/5 hover:border-white/15'
                }`}
              >
                {plan.popular && (
                  <span className="absolute top-4 right-4 bg-indigo-600 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                
                <h3 className="text-lg font-bold text-gray-100 mb-2">{plan.name}</h3>
                <p className="text-xs text-gray-400 mb-6">{plan.description}</p>
                
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-gray-100">{plan.price}</span>
                  <span className="text-xs text-gray-500">/ user / month</span>
                </div>
                
                <Button 
                  variant={plan.popular ? 'primary' : 'secondary'} 
                  className="w-full mb-8"
                  onClick={() => setRoute('register')}
                >
                  {plan.cta}
                </Button>
                
                <ul className="space-y-3.5 text-xs text-gray-400">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-4.5 w-4.5 text-indigo-400 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400">
            Got questions? We have answers. Find the most common queries resolved below.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div 
                key={idx}
                className="rounded-xl border border-white/5 bg-[#14161f]/40 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-medium text-gray-200 hover:text-gray-100 focus:outline-none cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-indigo-400' : ''}`} />
                </button>
                
                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/5 bg-[#07080a] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Video className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-gray-200">
              EchoMeet
            </span>
          </div>

          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} EchoMeet Inc. Built with love using Tailwind v4.
          </p>
          
          <div className="flex gap-4">
            <a href="#" className="text-xs text-gray-500 hover:text-gray-300">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-500 hover:text-gray-300">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
