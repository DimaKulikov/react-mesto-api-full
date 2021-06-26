import React from 'react';

import Popup from './Popup';

function PopupWithForm({ name, title, isOpen, onClose, onSubmit, children }) {
  return (
    <Popup {...{ name, isOpen, onClose }}>
      <form
        {...{ name, onSubmit }}
        className='form'
        noValidate
      >
        <h2 className='form__title'>{title}</h2>
        {children}
      </form>
    </Popup>
  );
}

export default PopupWithForm;
