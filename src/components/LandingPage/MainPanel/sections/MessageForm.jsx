import React, { useRef, useState } from 'react';
import { Col, Form, ProgressBar, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import firebase from '../../../../firebase';

function MessageForm() {
  const chatRoom = useSelector(state => state.chatRoom.currentChatRoom);
  const user = useSelector(state => state.user.userData);
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const messagesRef = firebase.database().ref('messages');
  const inputOpenImageRef = useRef();
  const storageRef = firebase.storage().ref();
  const isPrivateChatRoom = useSelector(state => state.chatRoom.isPrivateChatRoom);
  
  const handleChange = (event) => {

  }

  const createMessage = (fileUrl = null) => {

  }

  const handleSubmit = async () => {

  }

  const handleOpenImageRef = () => {

  }

  const getPath = () => {

  }

  const handleUploadImage = () => {

  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='exampleForm.ControlTextarea1'>
          <Form.Control
            value={content}
            onChange={handleChange}
            as='textarea'
            rows={3}
          />
        </Form.Group>
      </Form>
      <ProgressBar
        variant='success'
        style={{ 
          backgroundColor: !(percentage === 0 || percentage === 100) ?
            '' : 'transparent'
        }}
        label={`${percentage}%`}
        now={percentage}
      />
      <div>
        {errors.map(errorMsg => (
          <p
            className='text-warning'
            key={errorMsg}
          >
            {errorMsg}
          </p>
        ))}
      </div>

      <Row>
        <Col>
          <button
            onClick={handleSubmit}
            className='message-form-button'
            disabled={loading? true : false}
          >
            SEND
          </button>
        </Col>
        <Col>
          <button
            onClick={handleOpenImageRef}
            className='message-form-button'
            disabled={loading? true : false}
          >
            UPLOAD
          </button>
        </Col>
      </Row>

      <input
        accept='image/jpeg, image/png'
        style={{ display: 'none' }}
        type='file'
        ref={inputOpenImageRef}
        onChange={handleUploadImage}
      />
    </div>
  )
}

export default MessageForm;
