import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Phone, PhoneOff, Video } from 'lucide-react';
import { motion } from 'framer-motion';

export default function IncomingCall() {
  const { activeCall, acceptCall, declineCall } = useApp();

  if (!activeCall) return null;

  return (
    <div>incomming call</div>
  );
}
