import { useState } from 'react';

import PopupWithForm from './PopupWithForm';

function PlaceRemoveConfirmPopup({ isOpen, onClose, onDeleteConfirm, deletedCard }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    onDeleteConfirm(deletedCard)
      .then(onClose)
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <PopupWithForm
      name='place-remove'
      title='Вы уверены?'
      onSubmit={handleSubmit}
      {...{ isOpen, onClose }}
    >
      <button className='form__submit' type='submit'>
        {isSubmitting ? 'Удаление...' : 'Да'}
      </button>
    </PopupWithForm>
  );
}

export default PlaceRemoveConfirmPopup;
