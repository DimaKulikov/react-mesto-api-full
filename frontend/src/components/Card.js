import React from 'react';
import { useContext } from 'react';

import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = currentUser._id === card.owner._id;
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const likeBtnClassName = `card__like-btn 
    ${isLiked ? 'card__like-btn_active' : ''}
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className='card'>
      {isOwn && (
        <button
          className='card__remove-btn'
          onClick={handleDeleteClick}
        ></button>
      )}
      <img
        className='card__pic'
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className='card__caption'>
        <h2 className='card__title'>{card.name}</h2>
        <div className='card__like-container'>
          <button
            onClick={handleLikeClick}
            className={likeBtnClassName}
            type='button'
            aria-label='лайк'
          ></button>
          <span className='card__like-count'>{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
