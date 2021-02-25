import React, { Component } from 'react';
import { 
  Modal,
  Button,
  Form,
  Badge
} from 'react-bootstrap';
import { FaPlus, FaRegSmileWink } from 'react-icons/fa';
import firebase from '../../../../firebase';
import { connect } from 'react-redux';
import { Dialog } from '../../../../store';
import { setCurrentChatRoom, setPrivateChatRoom } from '../../../../redux/actions/chatRoom_action';

export class ChatRooms extends Component {

  state = {
    show: false,
    name: '',
    description: '',
    chatRoomsRef: firebase.database().ref('chatRooms'),
    messageRef: firebase.database().ref('messages'),
    chatRooms: [],
    firstLoad: true,
    activeChatRoomId: '',
    notifications: []
  }

  componentDidMount() {
    this.addChatRoomsListeners();
  }

  componentWillUnmount() {
    this.state.chatRoomsRef.off();
  }

  setFirstChatRoom = () => {
    if (this.state.firstLoad && this.state.chatRooms.length > 0) {
      const firstChatRoom = this.state.chatRooms[0];
      this.props.dispatch(setCurrentChatRoom(firstChatRoom));
      this.setState({activeChatRoomId: firstChatRoom.id});
    }
    this.setState({ firstLoad: false });
  }

  addChatRoomsListeners = () => {
    let chatRoomsArray = [];
    this.state.chatRoomsRef.on('child_changed', DataSnapshot => {
      chatRoomsArray.push(DataSnapshot.val());
      this.setState(
        { chatRooms: chatRoomsArray },
        () => this.setFirstChatRoom()
      );
    })
  }

  handleShow = () => this.setState({ show: true });
  handleClose = () => this.setState({ show: false });

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, description } = this.state;
    if (this.isFormValid(name, description)) {
      this.addChatRoom();
    }
  }

  addChatRoom = async () => {
    const key = (await this.state.chatRoomsRef.push()).key;
    const { name, description } = this.state;
    const { user } = this.props;
    const newChatRoom = {
      id: key,
      name: name,
      description: description,
      createdBy: {
        name: user.displayName,
        image: user.photoURL
      }
    }

    try {
      await this.state.chatRoomsRef.child(key).update(newChatRoom);
      this.setState({
        name: '',
        description: '',
        show: false
      })
    } catch (error) {
      Dialog.openDialog(Dialog.DANGER, null, error);
    }
  }

  isFormValid = (name, description) => name && description;

  changeChatRoom = (room) => {
    this.props.dispatch(setCurrentChatRoom(room));
    this.props.dispatch(setPrivateChatRoom(false));
    this.setState({ activeChatRoomId: room.id });
  }

  renderChatRooms = (chatRooms) => {
    chatRooms.length > 0 &&
    chatRooms.map(room => (
      <li
        key={room.id}
        style={{
          backgroundColor: room.id === this.state.activeChatRoomId &&
            '#ffffff45'
        }}
        onClick={() => this.changeChatRoom(room)}
      >
        # {room.name}
      </li>
    ))
  }

  render() {
    return (
      <div>
        <div className='sections-title'>
          <FaRegSmileWink className='sections-title-prefix' />
          CHAT ROOMS { ' ' } (1)

          <FaPlus 
            className='sections-title-suffix'
            onClick={this.handleShow}
          />
        </div>

        <ul className='sections-contents'>
          {this.renderChatRooms(this.state.chatRooms)}
        </ul>

        {/* ADD CHAT ROOM MODAL */}

        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create a chat room</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId='formBasicName'>
                <Form.Label>Room name</Form.Label>
                <Form.Control 
                  onChange={(e) => this.setState({ name: e.target.value })}
                  type='text' placeholder='Enter a chat room name'
                />
              </Form.Group>
              <Form.Group controlId='formBasicDescription'>
                <Form.Label>Room Description</Form.Label>
                <Form.Control
                  onChange={(e) => this.setState({ description: e.target.value })}
                  type='text' placeholder='Enter a chat room description'
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={this.handleClose}>
              Close
            </Button>
            <Button variant='primary' onClick={this.handleSubmit}>
              Create
            </Button>
          </Modal.Footer>
        </Modal>
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
export default connect(mapStateToProps)(ChatRooms);
