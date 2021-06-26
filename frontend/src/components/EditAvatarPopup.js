import React from 'react';
import { useState } from 'react';
import {useFormAndValidation} from '../hooks/useFormAndValidation'

import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleChange, errors, isValid, values, resetForm } = useFormAndValidation(false)

  function handleSubmit(e) {
    setIsSubmitting(true);
    e.preventDefault();
    onUpdateAvatar({ avatar: values.avatar })
      .then(() => {
        onClose();
        resetForm();
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <PopupWithForm
      name='avatar-edit'
      title='Обновить аватар'
      onSubmit={handleSubmit}
      {...{ isOpen, onClose }}
    >
      <input
        value={values.avatar || ''}
        className='form__input'
        type='url'
        id='avatar-link-input'
        name='avatar'
        placeholder='Ссылка на аватар'
        required
        autoComplete='off'
        onChange={handleChange}
      />
      <span className={`form__error ${errors.avatar ? 'form__error_active' : ''}`}>{errors.avatar}</span>
      <button className={`form__submit ${isValid ? '' : 'form__submit_disabled'}`} disabled={!isValid} type='submit'>
        {isSubmitting ? 'Сохранение...' : 'Сохранить'}
      </button>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
