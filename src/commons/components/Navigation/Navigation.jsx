import React from 'react';
import { GiClover } from 'react-icons/gi';
import { useHistory } from 'react-router-dom';
import ChatRooms from './sections/ChatRooms';
import DirectMessages from './sections/DirectMessages';
import Favorited from './sections/Favorited';
import UserPanel from './sections/UserPanel';

function Navigation() {
  let history = useHistory();

  return (
    <div id='nav'>
      {/* Logo */}
      <h3>
        <GiClover onClick={() => history.push('/')}/> {' Happy Stamp'}
      </h3>
      <UserPanel />
      <Favorited />
      <ChatRooms />
      <DirectMessages />
    </div>
  )
}

export default Navigation;

