import React from 'react'
import SidePanel from './SidePanel/SidePanel';
import MainPanel from './MainPanel/MainPanel';

function LandingPage() {
  return (
    <div className='landing'>
      <SidePanel />
      <MainPanel />
    </div>
  )
}

export default LandingPage
