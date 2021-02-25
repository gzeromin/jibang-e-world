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
  const [isFavorited, setIsFavorited] = useState(false);
  const usersRef = firebase.database().ref('users');
  const user = useSelector(state => state.user.userData);
  useEffect(() => {
    if (chatRoom && user) {
      addFavoriteListener(chatRoom.id, user.uid);
    }
  }, []);

  const addFavoriteListener = (chatRoomId, userId) => {

  }

  const handleFavorite = () => {

  }
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
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <p>
            <Image src='' /> {' '} user name
          </p>
        </div>
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
                    Click me!
                  </Accordion.Toggle>
                </Card.Header>
                <AccordionCollapse eventKey='0'>
                  <Card.Body>Hello! I'm the body</Card.Body>
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
                    Click me!
                  </Accordion.Toggle>
                </Card.Header>
                <AccordionCollapse eventKey='0'>
                  <Card.Body>Hello! I'm the body</Card.Body>
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
