import React, { Component } from 'react';
import firebase from '../../../firebase';
import MessageForm from './sections/MessageForm';
import MessageHeader from './sections/MessageHeader';
import Message from './sections/Message';
import { connect } from 'react-redux';

export class MainPanel extends Component {

  state = {
    messages: [],
    messagesRef: firebase.database().ref('messages'),
    messagesLoading: true,
    searchTerm: '',
    searchResults: [],
    searchLoading: false
  }

  componentDidMount() {
    const { chatRoom } = this.props;
    if (chatRoom) {
      this.addMessagesListeners(chatRoom.id);
    }
  }

  handleSearchMessages = () => {
    const chatRoomMessages = [...this.state.messages];
    const regex = new RegExp(this.state.searchTerm, 'gi');
    const searchResults = chatRoomMessages.reduce((acc, message) => {
      if (
        (message.content && message.content.match(regex)) ||
        message.user.name.match(regex)
      ) {
        acc.push(message);
      }
      return acc;
    },[]);
    this.setState({ searchResults });
  }

  handleSearchChange = event => {
    this.setState({
      searchTerm: event.target.value,
      searchLoading: true
    }, () => this.handleSearchMessages());
  }

  addMessagesListeners = (chatRoomId) => {
    let messagesArray = [];
    this.state.messagesRef.child(chatRoomId).on('child_added', DataSnapshot => {
      messagesArray.push(DataSnapshot.val());
      this.setState({
        messages: messagesArray,
        messagesLoading: false
      });
      
    })
  }

  renderMessages = (messages) =>
    messages.length > 0 &&
    messages.map(message => (
      <Message
        key={message.timestamp}
        message={message}
        user={this.props.user}
      />
    ))

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

const mapStateToProps = state => {
  return {
    user: state.user.userData,
    chatRoom: state.chatRoom.currentChatRoom
  }
}
export default connect(mapStateToProps)(MainPanel);
