import React, { Component } from 'react';
import { FaRegSmileBeam } from 'react-icons/fa';
import firebase from '../../../../firebase';

export class Favorited extends Component {

  state = {
    favoritedChatRooms: [],
    usersRef: firebase.database().ref('users'),
    activeChatRoomId: ''
  }

  removeListener = (userId) => {

  }

  addListeners = (userId) => {

  }

  changeChatRoom = (room) => {

  }

  renderFavoritedChatRooms = (favoritedChatRooms) => {

  }

  render() {
    const { favoritedChatRooms } = this.state;
    return (
      <div>
        <span className='sections-title'>
          <FaRegSmileBeam className='sections-title-prefix'/>
          FAVORITED { ' ' } (1)
        </span>
        <ul className='sections-contents'>
          {this.renderFavoritedChatRooms(favoritedChatRooms)}
        </ul>
      </div>
    )
  }
}

export default Favorited;
