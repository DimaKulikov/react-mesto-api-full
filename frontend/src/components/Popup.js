import { useEffect } from 'react';

function Popup({ onClose, isOpen, name, children }) {
  useEffect(() => {
    function closeOnEsc(evt) {
      if (evt.key === 'Escape') {
        onClose();
      }
    }
    const pageContent = document.querySelector('.page__content');
    if (isOpen) {
      document.addEventListener('keydown', closeOnEsc);
      pageContent.classList.add('page__content_blur');
    }
    return () => {
      document.removeEventListener('keydown', closeOnEsc);
      pageContent.classList.remove('page__content_blur');
    };
  }, [isOpen, onClose]);

  function handleClose(evt) {
    if (
      evt.target.classList.contains('popup') ||
      evt.target.classList.contains('popup__close-btn')
    )
      onClose();
  }

  const popupClassName = `popup popup_${name} ${isOpen ? 'popup_opened' : ''}`;

  return (
    <div className={popupClassName} onClick={handleClose}>
      <div className='popup__container'>
        <button
          className='popup__close-btn'
          type='button'
          aria-label='закрыть'
        ></button>
        {children}
      </div>
    </div>
  );
}

export default Popup;
