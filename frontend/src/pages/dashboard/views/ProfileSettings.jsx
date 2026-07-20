import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import Card from '../../../components/ui/Card';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
//
import { 
  User, 
  Settings, 
  Camera, 
  Mic, 
  Volume2, 
  Sparkles, 
  Keyboard, 
  Moon, 
  Sun, 
  Laptop,
  CheckCircle2
} from 'lucide-react';

//profile settings 
export default function ProfileSettings() {
  const { user, setUser } = useApp();
  
  // Profile Forms
  const [name, setName] = useState(user?.name || 'Sanesh Kumar');
  const [bio, setBio] = useState(user?.bio || 'Frontend redesigner | React Expert');
  const [email, setEmail] = useState(user?.email || 'sanesh@echomeet.io');
  
  // Selectors Mock
  const [selectedCamera, setSelectedCamera] = useState('cam-1');
  const [selectedMic, setSelectedMic] = useState('mic-1');
  const [selectedOutput, setSelectedOutput] = useState('out-1');
  const [selectedTheme, setSelectedTheme] = useState('dark');
  
  const [profileSaved, setProfileSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setUser(prev => ({
        ...prev,
        name,
        bio,
        email
      }));
      setSaving(false);
      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 3000);
    }, 1000);
  };

  const cameras = [
    { id: 'cam-1', label: 'FaceTime HD Camera (Built-in)' },
    { id: 'cam-2', label: 'OBS Virtual Camera' },
    { id: 'cam-3', label: 'External USB Webcam (UltraHD)' }
  ];

  const microphones = [
    { id: 'mic-1', label: 'Internal Microphone (System Default)' },
    { id: 'mic-2', label: 'Yeti USB Stereo Microphone' },
    { id: 'mic-3', label: 'Wireless Headset Audio Mic' }
  ];

  const audioOutputs = [
    { id: 'out-1', label: 'Internal Speakers (Built-in)' },
    { id: 'out-2', label: 'Headphones (External Audio Jack)' },
    { id: 'out-3', label: 'Wireless Airbuds (Bluetooth)' }
  ];

  const themeOptions = [
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'dark', label: 'Dark', icon: Moon },
    { id: 'system', label: 'System', icon: Laptop }
  ];

  const shortcuts = [
    { keys: '⌘ + D', action: 'Toggle Microphone' },
    { keys: '⌘ + E', action: 'Toggle Camera' },
    { keys: '⌘ + ⇧ + S', action: 'Share Screen' },
    { keys: '⌘ + ⇧ + B', action: 'Toggle Background Blur' },
    { keys: 'Esc', action: 'End Active Call' }
  ];

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Profile Card Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6 flex items-center gap-2">
              <User className="h-4.5 w-4.5 text-indigo-400" />
              <span>Personal Details</span>
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-5">
              {profileSaved && (
                <div className="flex items-center gap-2.5 bg-green-950/20 border border-green-500/30 text-green-400 px-4 py-3 rounded-xl text-xs font-medium">
                  <CheckCircle2 className="h-4.5 w-4.5 shrink-0" />
                  <span>Your changes have been saved successfully!</span>
                </div>
              )}


              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your display name"
                />
                <Input
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourname@echomeet.io"
                />
              </div>

              <Input
                label="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Write a short biography..."
              />

              <div className="flex justify-end pt-2">
                <Button type="submit" variant="primary" isLoading={saving}>
                  Save Changes
                </Button>
              </div>
            </form>
          </Card>

          {/* Audio and Video Device Settings */}
          <Card>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6 flex items-center gap-2">
              <Settings className="h-4.5 w-4.5 text-indigo-400" />
              <span>Devices & Quality</span>
            </h3>

            <div className="space-y-5">
              {/* Camera selection */}
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Camera className="h-3.5 w-3.5" />
                  <span>Video Source</span>
                </label>
                <select
                  value={selectedCamera}
                  onChange={(e) => setSelectedCamera(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-xs text-gray-200 focus:border-indigo-500 focus:outline-none transition-colors"
                >
                  {cameras.map((cam) => (
                    <option key={cam.id} value={cam.id} className="bg-[#14161f]">
                      {cam.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mic selection */}
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Mic className="h-3.5 w-3.5" />
                  <span>Microphone Source</span>
                </label>
                <select
                  value={selectedMic}
                  onChange={(e) => setSelectedMic(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-xs text-gray-200 focus:border-indigo-500 focus:outline-none transition-colors"
                >
                  {microphones.map((mic) => (
                    <option key={mic.id} value={mic.id} className="bg-[#14161f]">
                      {mic.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Output selection */}
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Volume2 className="h-3.5 w-3.5" />
                  <span>Audio Output Speakers</span>
                </label>
                <select
                  value={selectedOutput}
                  onChange={(e) => setSelectedOutput(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-xs text-gray-200 focus:border-indigo-500 focus:outline-none transition-colors"
                >
                  {audioOutputs.map((out) => (
                    <option key={out.id} value={out.id} className="bg-[#14161f]">
                      {out.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Theme & Shortcuts */}
        <div className="space-y-6">
          {/* Theme Settings card */}
          <Card>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6 flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-indigo-400" />
              <span>Theme Appearance</span>
            </h3>

            <div className="grid grid-cols-3 gap-2">
              {themeOptions.map((opt) => {
                const Icon = opt.icon;
                const isSelected = selectedTheme === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedTheme(opt.id)}
                    className={`flex flex-col items-center gap-2.5 p-3 rounded-xl border transition-all text-xs font-medium cursor-pointer ${
                      isSelected 
                        ? 'bg-indigo-600/10 border-indigo-500 text-indigo-400' 
                        : 'bg-white/5 border-white/5 text-gray-400 hover:text-gray-200 hover:bg-white/10'
                    }`}
                  >
                    <Icon className="h-4.5 w-4.5" />
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Keyboard shortcuts card */}
          <Card>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-5 flex items-center gap-2">
              <Keyboard className="h-4.5 w-4.5 text-indigo-400" />
              <span>Keyboard Shortcuts</span>
            </h3>

            <div className="space-y-3">
              {shortcuts.map((sh, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">{sh.action}</span>
                  <kbd className="bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[10px] text-gray-300 font-mono tracking-wider">
                    {sh.keys}
                  </kbd>
                </div>
              ))}
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
