import React from 'react'
import SidePanel from './SidePanel/SidePanel';
import MainPanel from './MainPanel/MainPanel';
import { useSelector } from 'react-redux';

function LandingPage() {
  const chatRoom = useSelector(state => state.chatRoom.currentChatRoom);
  const user = useSelector(state => state.user.userData);

  return (
    <div className='landing'>
      <SidePanel
        key={user ? user.uid : 'side'}
      />
      <MainPanel
        key={chatRoom ? chatRoom.id : 'main'}
      />
    </div>
  )
}

export default LandingPage
