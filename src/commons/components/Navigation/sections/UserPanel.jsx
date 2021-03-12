import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import mime from 'mime-types';
import { logoutUser, uploadPhoto } from '../../../../redux/actions/user_action';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { RiChatSmile3Line } from 'react-icons/ri';

function UserPanel() {
  const dispatch = useDispatch();
  let history = useHistory();

  const user = useSelector(state => state.user.userData);
  const inputOpenImageRef = useRef();

  const handleLogout = () => {
    dispatch(logoutUser());
  }

  const handleOpenImageRef = () => {
    inputOpenImageRef.current.click();
  }

  const handleUploadImage = async (event) => {
    const file = event.target.files[0];
    const metadata = { contentType: mime.lookup(file.name) };
    dispatch(uploadPhoto(file, metadata));
  }

  return (
    <div id='userPanel'>
      {!user && 
        <div style={{
          padding: '2rem 1rem'
        }}>
          <Button 
            variant="success"
            block
            onClick={() => history.push('/login')}
          >
            Login
          </Button>
          <Button 
            variant="danger"
            block
            onClick={() => history.push('/register')}
          >
            Register
          </Button>
        </div>
      }
      {user &&
        <div style={{ padding: '0 .3rem', wordBreak: 'break-all' }}>
          <div style={{ float: 'left', marginRight: '.5rem' }}>
            <Dropdown drop='right'>
              <Dropdown.Toggle
                style={{ 
                  background: 'transparent', 
                  border: '0rem',
                  width: '100%'
                }}
                id='dropdown-user'
              >
                { user && user.displayName }
              </Dropdown.Toggle>
              <Dropdown.Menu className="super-colors">
                <Dropdown.Item onClick={handleOpenImageRef}>
                  change profile photo
                </Dropdown.Item>
                <Dropdown.Item onClick={handleOpenImageRef}>
                  change name
                </Dropdown.Item>
                <Dropdown.Item onClick={handleOpenImageRef}>
                  change message
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>
                  logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Image
              src={user && user.photoURL}
              style={{ 
                width: '90px', 
                height: '90px', 
                marginTop: '2px'
              }}
              rounded
              onClick={() => history.push('/private')}
            />
          </div>
          <RiChatSmile3Line 
            style={{ 
              float: 'right',
              border: '1px solid green',
              borderRadius: '5rem',
              backgroundColor: 'green',
              fontSize: '1.5rem',
              cursor: 'pointer',
              marginTop: '.3rem'
            }}
          />
          <div style={{ padding: '.5rem'}}>
            Lorem Ipsum is simply dummy text of the printing and55
          </div>

        </div>
      }
      <input 
        onChange={handleUploadImage}
        accept='image/jpeg, image/png'
        style={{ display: 'none'}}
        ref={inputOpenImageRef}
        type='file'
      />
    </div>
  )
}

export default UserPanel;
