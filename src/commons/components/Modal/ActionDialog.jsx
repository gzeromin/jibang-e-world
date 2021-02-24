import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Dialog } from '../../../store';
import { observer } from 'mobx-react';
import { GiConfirmed } from 'react-icons/gi';
import { VscError } from 'react-icons/vsc';
import { VscWarning } from 'react-icons/vsc';
import { VscInfo } from 'react-icons/vsc';
import { FaQuestion } from 'react-icons/fa';

function ActionModal() {

  const icon = () => {
    switch (Dialog.type) {
      case Dialog.SUCCESS :
        return <GiConfirmed className='text-success' />;
      case Dialog.DANGER :
        return <VscError className='text-danger' />;
      case Dialog.WARNING :
        return <VscWarning className='text-warning' />;
      case Dialog.INFO :
        return <VscInfo className='text-info' />;
      case Dialog.CONFIRM :
        return <FaQuestion className='text-primary' />;
      default :
        return null;
    }
  }
  return (
    <div>
      <Modal
        show={Dialog.show}
        centered
        animation={false}
        size='sm'
        onHide={() => {}}
      >
        <Modal.Header>
          <Modal.Title>
            { icon() } { Dialog.title }
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h5>{Dialog.message}</h5>
          <p>{Dialog.subMessage}</p>
        </Modal.Body>

        <Modal.Footer>
          {Dialog.type === Dialog.CONFIRM &&
            <Button
              variant="secondary"
              onClick={() => Dialog.closeDialog(false)}
            >
              CANCEL
            </Button>
          }
          <Button 
            variant="primary"
            onClick={() => Dialog.closeDialog(true)}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default observer(ActionModal);
