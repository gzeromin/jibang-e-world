import React, { Component } from 'react';
import firebase from '../../../firebase';
import MessageForm from './sections/MessageForm';
import MessageHeader from './sections/MessageHeader';

export class MainPanel extends Component {

  state = {
    messages: [],
    messagesRef: firebase.database().ref('messages'),
    messagesLoading: true,
    searchTerm: '',
    searchResults: [],
    searchLoading: false
  }

  handleSearchMessages = () => {

  }

  handleSearchChange = event => {

  }

  addMessagesListeners = (chatRoomId) => {

  }

  renderMessages = (messages) => {

  }

  render() {
    const { messages, searchTerm, searchResults } = this.state;
    return (
      <div className='mainPanel'>
        <MessageHeader handleSearchChange={this.handleSearchChange} />
        <div className='message-body'>
          {searchTerm ? 
            this.renderMessages(searchResults)
            :
            this.renderMessages(messages)
          }
        </div>
        <MessageForm />
      </div>
    )
  }
}

export default MainPanel;


