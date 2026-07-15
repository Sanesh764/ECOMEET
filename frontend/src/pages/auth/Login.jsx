import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { User, Lock, Video, AlertCircle, ArrowRight } from 'lucide-react';

export default function Login() {
  const { login, setRoute, loading } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    
    const res = await login(username, password);
    if (res.success) {
      if (res.simulated) {
        setSuccessMsg('Simulated login successful! Redirecting...');
      } else {
        setSuccessMsg('Logged in successfully!');
      }
    } else {
      setError(res.error || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-gray-100 flex font-sans">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-950/20 rounded-full blur-3xl pointer-events-none" />
      
      {/* Split Screen Layout */}
      <div className="w-full lg:grid lg:grid-cols-2">
        {/* Left Side: Brand Illustration */}
        <div className="hidden lg:flex flex-col justify-between bg-radial from-indigo-950/30 to-[#07080a] border-r border-white/5 p-12 relative overflow-hidden">
          {/* Connecting waves grid background simulation */}
          <div className="absolute inset-0 opacity-15" style={{ 
            backgroundImage: 'radial-gradient(rgba(99, 102, 241, 0.15) 1px, transparent 1px)', 
            backgroundSize: '24px 24px' 
          }} />
          
          <div className="flex items-center gap-2.5 z-10 cursor-pointer" onClick={() => setRoute('landing')}>
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-600/30">
              <Video className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              EchoMeet
            </span>
          </div>

          <div className="z-10 my-auto flex flex-col gap-6 max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full text-xs font-semibold w-max"
            >
              <span>Beta Redesign v2.0</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.15]"
            >
              Connect with your remote team instantly.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-400 leading-relaxed text-sm sm:text-base"
            >
              Experience high quality WebRTC calls, instant chats, and customizable setups. Switch rooms in less than a second. Built on top of high performance standards.
            </motion.p>
          </div>

          <div className="z-10 text-xs text-gray-500 flex justify-between">
            <span>© {new Date().getFullYear()} EchoMeet</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-gray-300">Privacy</a>
              <a href="#" className="hover:text-gray-300">Terms</a>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex flex-col justify-center items-center px-6 py-12 lg:px-16 xl:px-24">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
              {/* Mobile navbar item */}
              <div className="lg:hidden flex items-center gap-2.5 mb-8 cursor-pointer" onClick={() => setRoute('landing')}>
                <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center">
                  <Video className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight text-white">
                  EchoMeet
                </span>
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight text-gray-100">
                Welcome back
              </h2>
              <p className="mt-2 text-sm text-gray-400">
                Don't have an account?{' '}
                <button
                  onClick={() => setRoute('register')}
                  className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer focus:outline-none"
                >
                  Create one now
                </button>
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {error && (
                <div className="flex items-start gap-2.5 bg-red-950/20 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-xs font-medium animate-pulse-slow">
                  <AlertCircle className="h-4.5 w-4.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {successMsg && (
                <div className="flex items-start gap-2.5 bg-green-950/20 border border-green-500/30 text-green-400 px-4 py-3 rounded-xl text-xs font-medium">
                  <AlertCircle className="h-4.5 w-4.5 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              <div className="space-y-4">
                <Input
                  label="Username"
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  placeholder="e.g. sanesh"
                  icon={User}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <Input
                  label="Password"
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  icon={Lock}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-500/50"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-xs font-medium text-gray-400">
                    Remember me
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full py-3"
                isLoading={loading}
                icon={ArrowRight}
              >
                Sign In
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#07080a] px-3.5 text-gray-500 font-semibold tracking-wider">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <button
                type="button"
                onClick={() => setRoute('dashboard')}
                className="inline-flex justify-center items-center gap-2.5 rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-xs font-semibold text-gray-300 hover:bg-white/10 hover:border-white/10 transition-all cursor-pointer"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>
                <span>Google</span>
              </button>
              <button
                type="button"
                onClick={() => setRoute('dashboard')}
                className="inline-flex justify-center items-center gap-2.5 rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-xs font-semibold text-gray-300 hover:bg-white/10 hover:border-white/10 transition-all cursor-pointer"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.527-10-10-10z" />
                </svg>
                <span>GitHub</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
