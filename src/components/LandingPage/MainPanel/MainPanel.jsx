import React, { Component } from 'react';
import firebase from '../../../firebase';
import MessageForm from './sections/MessageForm';
import MessageHeader from './sections/MessageHeader';
import Message from './sections/Message';
import { connect } from 'react-redux';
import { setUserPosts } from '../../../redux/actions/chatRoom_action';
import Skeleton from '../../../commons/components/Skeleton/Skeleton';

export class MainPanel extends Component {

  messageEndRef = React.createRef();

  state = {
    messages: [],
    messagesRef: firebase.database().ref('messages'),
    messagesLoading: true,
    searchTerm: '',
    searchResults: [],
    searchLoading: false,
    typingRef: firebase.database().ref('typing'),
    typingUsers: [],
    listenerList: []
  }

  componentDidMount() {
    const { chatRoom } = this.props;
    if (chatRoom) {
      this.addMessagesListeners(chatRoom.id);
      this.addTypingListeners(chatRoom.id);
    }
  }

  componentDidUpdate() {
    if (this.messageEndRef) {
      this.messageEndRef.scrollIntoView({ behavior: 'smooth' });
    }
  }

  componentWillUnmount() {
    const { chatRoom, user } = this.props;
    if (chatRoom && user) {
      this.state.typingRef
      .child(chatRoom.id)
      .child(user.uid)
      .remove();
    }

    // remove Listener
    this.removeListeners(this.state.listenerList);
    this.state.messagesRef.off();
  }

  removeListeners = (listeners) => {
    listeners.forEach(listener => {
      listener.ref.child(listener.id).off(listener.event);
    })
  }

  addTypingListeners = (chatRoomId) => {
    let typingUsers = [];
    this.state.typingRef.child(chatRoomId).on('child_added', DataSnapshot => {
      if (DataSnapshot.key !== this.props.user.uid) {
        typingUsers = typingUsers.concat({
          id: DataSnapshot.key,
          name: DataSnapshot.val()
        });
        this.setState({ typingUsers });
      }
    });
    this.addToListenerList(chatRoomId, this.state.typingRef, 'child_added');

    this.state.typingRef.child(chatRoomId).on('child_removed', DataSnapshot => {
      const index = typingUsers.findIndex(user => user.id === DataSnapshot.key);
      if (index !== -1) {
        typingUsers = typingUsers.filter(user => user.id !== DataSnapshot.key);
        this.setState({ typingUsers });
      }
    });
    this.addToListenerList(chatRoomId, this.state.typingRef, 'child_removed');
  }

  addToListenerList = (id, ref, event) => {
    const index = this.state.listenerList.findIndex(listener => {
      return (
        listener.id === id &&
        listener.ref === ref &&
        listener.event === event
      )
    });

    if (index === -1) {
      const newListener = { id, ref, event };
      this.setState({
        listenerList: this.state.listenerList.concat(newListener)
      });
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
      this.userPostsCount(messagesArray);
    })
  }

  userPostsCount = (messages) => {
    let userPosts = messages.reduce((acc, message) => {
      if(message.user.name in acc) {
        acc[message.user.name].count += 1;
      } else {
        acc[message.user.name] = {
          image: message.user.image,
          count: 1
        }
      }
      return acc;
    }, {});
    this.props.dispatch(setUserPosts(userPosts));
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

  renderTypingUsers = (typingUsers) =>
    typingUsers.length > 0 &&
    typingUsers.map(user => (
      <span>{user.name}님이 채팅을 입력하고 있습니다...</span>
    ));
  
  renderMessageSkeleton = (loading) =>
    loading && (
      <>
        {[...Array(10)].map((undefine, i) => (
          <Skeleton key={i} />
        ))}
      </>
    )

  render() {
    const { 
      messages,
      searchTerm,
      searchResults,
      typingUsers,
      messagesLoading
    } = this.state;

    return (
      <div className='mainPanel'>
        <MessageHeader handleSearchChange={this.handleSearchChange} />
        <div className='message-body'>
          {this.renderMessageSkeleton(messagesLoading)}
          {searchTerm ? 
            this.renderMessages(searchResults)
            :
            this.renderMessages(messages)
          }
          { this.renderTypingUsers(typingUsers) }
          <div ref={node => (this.messageEndRef = node)} />
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
