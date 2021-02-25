import React, { Component } from 'react';
import { FaRegSmile } from 'react-icons/fa';
import firebase from '../../../../firebase';

export class DirectMessages extends Component {

  state = {
    usersRef: firebase.database().ref('users'),
    users: [],
    activeChatRoom: ''
  }

  addUsersListeners = (currentUserId) => {

  }

  getChatRoomId = (userId) => {

  }

  changeChatRoom = (user) => {

  }

  setActiveChatRoom = (userId) => {

  }

  renderDirectMessages = users => (<></>)

  render() {
    const { users } = this.state;
    return (
      <div>
        <span className='sections-title'>
          <FaRegSmile className='sections-title-prefix'/>
          DIRECT MESSAGES { ' ' } (1)
        </span>
        <ul className='sections-contents'>
          {this.renderDirectMessages(users)}
        </ul>
      </div>
    )
  }
}

export default DirectMessages;
