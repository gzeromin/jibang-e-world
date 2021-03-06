import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import mime from 'mime-types';
import { logoutUser, uploadPhoto } from '../../../../redux/actions/user_action';

function UserPanel() {
  const dispatch = useDispatch();
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
      <div style={{ display: 'flex', marginBottom: '1rem' }}>
        <Image
          src={user && user.photoURL}
          style={{ width: '60px', height: '60px', marginTop: '3px'}}
          rounded
        />

        <Dropdown>
          <Dropdown.Toggle
            style={{ background: 'transparent', border: '0rem' }}
            id='dropdown-user'
          >
            { user && user.displayName }
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleOpenImageRef}>
              change profile photo
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>
              logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
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
