import React, { useEffect, useState } from 'react';
import { 
  Accordion,
  AccordionCollapse,
  Button,
  Card,
  Col,
  Container,
  FormControl,
  Image,
  InputGroup,
  Media,
  Row
} from 'react-bootstrap';
import { FaLock, FaLockOpen } from 'react-icons/fa';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import firebase from '../../../../firebase';

function MessageHeader({ handleSearchChange }) {
  const chatRoom = useSelector(state => state.chatRoom.currentChatRoom);
  const isPrivateChatRoom = useSelector(state => state.chatRoom.isPrivateChatRoom);
  const userPosts = useSelector(state => state.chatRoom.userPosts);

  const [isFavorited, setIsFavorited] = useState(false);
  const usersRef = firebase.database().ref('users');
  const user = useSelector(state => state.user.userData);
  useEffect(() => {
    if (chatRoom && user) {
      addFavoriteListener(chatRoom.id, user.uid);
    }
  }, []);

  const addFavoriteListener = (chatRoomId, userId) => {
    usersRef
      .child(userId)
      .child('favorited')
      .once('value')
      .then(data => {
        if (data.val() !== null) {
          const chatRoomIds = Object.keys(data.val());
          const isAlreadyFavorited = chatRoomIds.includes(chatRoomId);
          setIsFavorited(isAlreadyFavorited);
        }
      })
  }

  const handleFavorite = () => {
    if (isFavorited) {
      usersRef
        .child(`${user.uid}/favorited`)
        .child(chatRoom.id)
        .remove(err => {
          if (err !== null) {
            console.error(err);
          }
        });
    } else {
      usersRef
        .child(`${user.uid}/favorited`)
        .update({
          [chatRoom.id]: {
            name: chatRoom.name,
            description: chatRoom.description,
            createdBy: {
              name: chatRoom.createdBy.name,
              image: chatRoom.createdBy.image
            }
          }
        });
    }
    setIsFavorited(prev => !prev);
  }

  const renderUserPosts = (userPosts) =>
    Object.entries(userPosts)
    .sort((a,b) => b[1].count - a[1].count)
    .map(([key, val], i) => (
      <Media key={i}>
        <img
          style={{ borderRadius: 25 }}
          width={48}
          height={48}
          className='mr-3'
          src={val.image}
          alt={val.name}
        />
        <Media.Body>
          <h6>{key}</h6>
          <p>
            {val.count} 개
          </p>
        </Media.Body>
      </Media>
    ));

  return (
    <div className='message-header'>
      <Container>
        <Row>
          <Col>
            <h2>
              {isPrivateChatRoom ? 
                <FaLock className='message-header-icon' />
                :
                <FaLockOpen className='message-header-icon' />
              }
              {chatRoom && chatRoom.name}
              {!isPrivateChatRoom &&
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={handleFavorite}
                >
                  {isFavorited ?
                    <MdFavorite className='message-header-icon' />
                    :
                    <MdFavoriteBorder className='message-header-icon' />
                  }
                </span>
              }
            </h2>
          </Col>
          <Col>
            <InputGroup className='mb-3'>
              <InputGroup.Prepend>
                <InputGroup.Text id='basic-addon1'>
                  <AiOutlineSearch />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                onChange={handleSearchChange}
                placeholder='Search Messages'
                aria-label='Search'
                aria-describedby='basic-addon1'
              />
            </InputGroup>
          </Col>
        </Row>
        {!isPrivateChatRoom &&
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <p>
              <Image 
                src={chatRoom && chatRoom.createdBy.image} 
                roundedCircle
                style={{ width: '30px', height: '30px'}}
              /> {' '} {chatRoom && chatRoom.createdBy.name}
            </p>
          </div>
        }
        <Row>
          <Col>
            <Accordion>
              <Card>
                <Card.Header style={{ padding: '0 1rem' }}>
                  <Accordion.Toggle 
                    as={Button} 
                    variant='link'
                    eventKey='0'
                  >
                    Description
                  </Accordion.Toggle>
                </Card.Header>
                <AccordionCollapse eventKey='0'>
                  <Card.Body>{chatRoom && chatRoom.description}</Card.Body>
                </AccordionCollapse>
              </Card>
            </Accordion>
          </Col>
          <Col>
          <Accordion>
              <Card>
                <Card.Header style={{ padding: '0 1rem' }}>
                  <Accordion.Toggle 
                    as={Button} 
                    variant='link'
                    eventKey='0'
                  >
                    Posts Count
                  </Accordion.Toggle>
                </Card.Header>
                <AccordionCollapse eventKey='0'>
                  <Card.Body>
                    { userPosts && renderUserPosts(userPosts)}
                  </Card.Body>
                </AccordionCollapse>
              </Card>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default MessageHeader;
