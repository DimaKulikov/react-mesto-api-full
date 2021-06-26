import React from 'react';
import { useEffect, useRef, useState } from 'react';

import { PopupSpinner } from './PopupSpinner';
import Popup from './Popup';

function ImagePopup({ card, onClose, isOpen }) {
  const [isImageLoading, setIsImageLoading] = useState(true);

  const img = useRef();

  useEffect(() => {
    if (!img.current.complete) {
      setIsImageLoading(true);
    }
  }, [card]);

  const imageClassName = `popup__image ${
    isImageLoading ? 'popup__image_hidden' : ''
  }`;

  return (
    <Popup name='image' {...{ isOpen, onClose }}>
      {isImageLoading && <PopupSpinner />}
      <img
        ref={img}
        className={imageClassName}
        src={card?.link}
        alt={card?.name}
        onLoad={() => {
          setIsImageLoading(false);
        }}
      />
      <p className='popup__subtitle'>{card?.name}</p>
    </Popup>
  );
}

export default ImagePopup;
