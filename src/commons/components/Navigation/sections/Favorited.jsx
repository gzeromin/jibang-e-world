import React, { Component } from 'react';
import { FaRegSmileBeam } from 'react-icons/fa';
import { connect } from 'react-redux';
import firebase from '../../../../firebase';
import { setCurrentChatRoom, setPrivateChatRoom } from '../../../../redux/actions/chatRoom_action';

export class Favorited extends Component {

  state = {
    favoritedChatRooms: [],
    usersRef: firebase.database().ref('users'),
    activeChatRoomId: ''
  }

  componentDidMount() {
    if(this.props.user) {
      this.addListeners(this.props.user.uid);
    }
  }

  componentWillUnmount() {
    if(this.props.user) {
      this.removeListener(this.props.user.uid);
    }
  }

  removeListener = (userId) => {
    this.state.usersRef.child(`${userId}/favorited`).off();
  }

  addListeners = (userId) => {
    const { usersRef } = this.state;
    usersRef
      .child(userId)
      .child('favorited')
      .on('child_added', DataSnapshot => {
        const favoritedChatRoom = { id: DataSnapshot.key, ...DataSnapshot.val() };
        this.setState({
          favoritedChatRooms: [...this.state.favoritedChatRooms, favoritedChatRoom]
        });
      });
      usersRef
      .child(userId)
      .child('favorited')
      .on('child_removed', DataSnapshot => {
        const filteredChatRooms = this.state.favoritedChatRooms.filter(chatRoom => {
          return chatRoom.id !== DataSnapshot.key;
        });
        this.setState({
          favoritedChatRooms: filteredChatRooms
        });
      });
  }

  changeChatRoom = (room) => {
    this.props.dispatch(setCurrentChatRoom(room));
    this.props.dispatch(setPrivateChatRoom(false));
    this.setState({ activeChatRoomId: room.id });
  }

  renderFavoritedChatRooms = (favoritedChatRooms) =>
    favoritedChatRooms.length > 0 &&
    favoritedChatRooms.map(chatRoom => (
        <li
          key={chatRoom.id}
          onClick={() => this.changeChatRoom(chatRoom)}
          style={{
            backgroundColor: chatRoom.id === this.state.activeChatRoomId && '#ffffff45'
          }}
        >
          # {chatRoom.name}
        </li>
      ))

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

const mapStateToProps = state => {
  return {
    user: state.user.userData
  }
}
export default connect(mapStateToProps)(Favorited);