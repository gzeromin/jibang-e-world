import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Dialog } from '../../../store';
import { observer } from 'mobx-react';

function ActionModal() {

  return (
    <div>
      <Modal
        show={Dialog.show}
        onHide={Dialog.closeDialog}
        centered
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default observer(ActionModal);
