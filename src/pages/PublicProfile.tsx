import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import SmartphoneFrame from '../components/dashboard/SmartphoneFrame';

export default function PublicProfile() {
  const { username } = useParams();

  // In a real app we would fetch the user and their links via Supabase
  const [socialLinks] = useState([]);

  return (
    <div className="min-h-screen bg-black flex justify-center">
       <SmartphoneFrame isPublicView={true} socialLinks={socialLinks} username={username} displayName={username} />
    </div>
  );
}