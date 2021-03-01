import React from 'react'
import SidePanel from './SidePanel/SidePanel';
import MainPanel from './MainPanel/MainPanel';
import { useSelector } from 'react-redux';

function LandingPage() {
  const chatRoom = useSelector(state => state.chatRoom.currentChatRoom);

  return (
    <div className='landing'>
      <SidePanel />
      <MainPanel
        key={chatRoom ? chatRoom.id : 'mainPanel'}
      />
    </div>
  )
}

export default LandingPage
