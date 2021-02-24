import React from 'react';
import ChatRooms from './sections/ChatRooms';
import DirectMessages from './sections/DirectMessages';
import Favorited from './sections/Favorited';
import UserPanel from './sections/UserPanel';

function SidePanel() {
  return (
    <div className='sidePanel'>
      <UserPanel />
      <Favorited />
      <ChatRooms />
      <DirectMessages />
    </div>
  )
}

export default SidePanel;
