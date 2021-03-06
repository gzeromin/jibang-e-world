import React from 'react';
import { GiClover } from 'react-icons/gi';
import ChatRooms from './sections/ChatRooms';
import DirectMessages from './sections/DirectMessages';
import Favorited from './sections/Favorited';
import UserPanel from './sections/UserPanel';

function SidePanel() {
  return (
    <div className='sidePanel'>
      {/* Logo */}
      <h3>
        <GiClover/> {' Happy Stamp'}
      </h3>
      <UserPanel />
      <Favorited />
      <ChatRooms />
      <DirectMessages />
    </div>
  )
}

export default SidePanel;
