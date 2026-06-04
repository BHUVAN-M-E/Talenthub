import React, { useState } from 'react';
import Navbar from './components/Navbar';
import JobBoard from './screens/JobBoard';
import Profile from './screens/Profile';

export default function App() {
  const [screen, setScreen] = useState('jobs');

  return (
    <>
      <Navbar screen={screen} onNavigate={setScreen} />
      {screen === 'jobs' ? <JobBoard /> : <Profile />}
    </>
  );
}
