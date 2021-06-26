import React from 'react';
import { useState } from 'react';
import {useFormAndValidation} from '../hooks/useFormAndValidation'

import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleChange, errors, isValid, resetForm, values } = useFormAndValidation(false)

  function handleSubmit(e) {
    setIsSubmitting(true);
    e.preventDefault();
    onAddPlace({ name: values.name, link: values.link })
      .then(() => {
        onClose();
        resetForm()
      })      
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <PopupWithForm
      name='place-add'
      title='Новое место'
      onSubmit={handleSubmit}
      {...{ isOpen, onClose }}
    >
      <input
        value={values.name || ''}
        onChange={handleChange}
        className='form__input'
        type='text'
        id='place-name-input'
        name='name'
        placeholder='Название'
        required
        autoComplete='off'
        minLength='2'
        maxLength='30'
      />
      <span className={`form__error ${errors.name ? 'form__error_active' : ''}`}>{errors.name}</span>
      <input
        value={values.link || ''}
        onChange={handleChange}
        className='form__input'
        type='url'
        id='place-image-input'
        name='link'
        placeholder='Ссылка на картинку'
        required
        autoComplete='off'
      />
      <span className={`form__error ${errors.link ? 'form__error_active' : ''}`}>{errors.link}</span>
      <button className={`form__submit ${isValid ? '' : 'form__submit_disabled'}`} disabled={!isValid} type='submit'>
        {isSubmitting ? 'Сохранение...' : 'Создать'}
      </button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
