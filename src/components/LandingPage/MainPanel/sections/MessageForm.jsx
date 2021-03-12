import React, { useRef, useState } from 'react';
import { Col, Form, ProgressBar, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import firebase from '../../../../firebase';
import mime from 'mime-types';

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
  const typingRef = firebase.database().ref('typing');
  const isPrivateChatRoom = useSelector(state => state.chatRoom.isPrivateChatRoom);
  
  const handleChange = (event) => {
    setContent(event.target.value);
  }

  const createMessage = (fileUrl = null) => {
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: user.uid,
        name: user.displayName,
        image: user.photoURL
      }
    }
    if(fileUrl !== null) {
      message['image'] = fileUrl;
    } else {
      message['content'] = content;
    }
    return message;
  }

  const handleSubmit = async () => {
    if (!content) {
      setErrors(prev => prev.concat('Type contents first'));
      return;
    }
    setLoading(true);
    // save message at firebase
    try {
      await messagesRef.child(chatRoom.id).push().set(createMessage());
      
      typingRef.child(chatRoom.id).child(user.uid).remove();
      
      setContent('');
      setErrors([]);
    } catch (error) {
      setErrors(pre => pre.concat(error.message));
      setTimeout(() => {
        setErrors([]);
      }, 5000);
    } finally {
      setLoading(false);
    }

  }

  const handleOpenImageRef = () => {
    inputOpenImageRef.current.click();
  }

  const getPath = () => {
    if (isPrivateChatRoom) {
      return `message/private/${chatRoom.id}`;
    } else {
      return `message/public`;
    }
  }

  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    if(!file) return;
    const filePath = `${getPath()}/${file.name}`;
    const metadata = { contentType: mime.lookup(file.name) };
    setLoading(true);
    try {
      // save file at storage
      let uploadTask = storageRef.child(filePath).put(file, metadata);
      
      //set percentage
      uploadTask.on('state_changed',
        UploadTaskSnapshot => {
          const percentage = Math.round(
            (UploadTaskSnapshot.bytesTransferred / UploadTaskSnapshot.totalBytes) * 100
          );
          setPercentage(percentage);
          if(percentage === 100) {
            setTimeout(() => {
              setPercentage(0);
            }, 1000);
          }
        },
        err => {
          setErrors(pre => pre.concat(err.message));
          setTimeout(() => {
            setErrors([]);
          }, 5000);
          setLoading(false);
        },
        () => {
          // send file message after saving (save at database)
          // get URL being able to download saved file
          uploadTask.snapshot.ref.getDownloadURL()
            .then(downloadURL => {
              messagesRef.child(chatRoom.id).push().set(createMessage(downloadURL));
            })
            setContent('');
            setErrors([]);
            setLoading(false);
        }
      );
    } catch (error) {
      setErrors(pre => pre.concat(error.message));
      setTimeout(() => {
        setErrors([]);
      }, 5000);
      setLoading(false);
    }
  }

  const handleKeyDown = event => {
    if (event.ctrlKey && event.keyCode === 13) {
      handleSubmit();
    }

    if (content) {
      typingRef
        .child(chatRoom.id)
        .child(user.uid)
        .set(user.displayName);
    } else {
      typingRef
        .child(chatRoom.id)
        .child(user.uid)
        .remove();
    }
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='exampleForm.ControlTextarea1'>
          <Form.Control
            onKeyDown={handleKeyDown}
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
          backgroundColor: 'transparent'
        }}
        label={`${percentage}%`}
        now={percentage}
      />
      <div>
        {errors.map(errorMsg => (
          <p
            className='text-danger'
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
