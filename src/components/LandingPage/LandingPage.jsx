import React from 'react'
import SidePanel from './SidePanel/SidePanel';
import MainPanel from './MainPanel/MainPanel';
import { useSelector } from 'react-redux';

function LandingPage(props) {
  const chatRoom = useSelector(state => state.chatRoom.currentChatRoom);
  const user = useSelector(state => state.user.userData);

  console.log(props)
  return (
    <div className='landing'>
      <MainPanel
        key={chatRoom ? chatRoom.id : 'main'}
      />
    </div>
  )
}

export default LandingPage
