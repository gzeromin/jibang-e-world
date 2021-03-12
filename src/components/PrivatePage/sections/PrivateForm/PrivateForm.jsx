import React from 'react';
import { Form } from 'react-bootstrap';
import { GiClover } from 'react-icons/gi';
import { GrYoga } from 'react-icons/gr';

function PrivateForm() {
  return (
    <div className='private-form'>
      <div className='btn-outter'>
        <GiClover className='btn-outter-happy' />
        <GrYoga className='btn-outter-yoga' />
        <div></div>
        <div className='btn-inner'>
          <GiClover
            className='btn-inner-stamp'
          />
        </div>
      </div>
      <Form 
        className='text'
        onSubmit
      >
        <Form.Group controlId='exampleForm.ControlTextarea1'>
          <Form.Control
            onKeyDown
            value
            onChange
            as='textarea'
            rows={6}
          />
        </Form.Group>
      </Form>
    </div>
  )
}

export default PrivateForm;
