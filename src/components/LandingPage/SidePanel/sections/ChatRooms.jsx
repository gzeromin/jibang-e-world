import React, { Component } from 'react';
import { 
  Modal,
  Button,
  Form,
  Badge
} from 'react-bootstrap';
import { FaPlus, FaRegSmileWink } from 'react-icons/fa';
import firebase from '../../../../firebase';

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

  handleShow = () => this.setState({ show: true });
  handleClose = () => this.setState({ show: false });

  handleSubmit = () => {

  }

  renderChatRooms = (chatRooms) => {

  }

  render() {
    return (
      <div>
        <div className='sections-title'>
          <FaRegSmileWink style={{ marginRight: 3 }} />
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
              <Form.Group controlId='formBasicName'>
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

export default ChatRooms;
