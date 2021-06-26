import React from 'react';
import { useContext } from 'react';

import CurrentUserContext from '../contexts/CurrentUserContext';

import Card from './Card';

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}){
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className='page__section'>
      <section className='profile'>
        <button
          onClick={onEditAvatar}
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
          className='profile__avatar'
        ></button>
        <div className='profile__text-container'>
          <div className='profile__name-container'>
            <h1 className='profile__name'>{currentUser.name}</h1>
            <button
              onClick={onEditProfile}
              className='profile__edit-btn'
              type='button'
              aria-label='редактировать профиль'
            ></button>
          </div>
          <p className='profile__subtitle'>{currentUser.about}</p>
        </div>
        <button
          onClick={onAddPlace}
          className='profile__add-btn'
          type='button'
          aria-label='Добавить'
        ></button>
      </section>
      <section className='cards'>
        <div className='cards__spinner'></div>
        <ul className='cards__list'>
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                {...{ card, onCardClick, onCardLike, onCardDelete }}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
