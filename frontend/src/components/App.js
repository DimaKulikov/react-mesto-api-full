import React from 'react';
import { useEffect, useState } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import PlaceRemoveConfirmPopup from './PlaceRemoveConfirmPopup';

import CurrentUserContext from '../contexts/CurrentUserContext';

import api from '../utils/api';
import authApi from '../utils/authApi';
import { defaultUser } from '../utils/constants';
import { Route, Switch, useHistory } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isPlaceRemoveConfirmPopupOpen, setIsPlaceRemoveConfirmPopupOpen] =
    useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false)
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState();
  const [deletedCard, setDeletedCard] = useState();
  const [currentUser, setCurrentUser] = useState(defaultUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [infoTooltipIcon, setIsInfoTooltipIcon] = useState(null)
  const [infoTooltipMessage, setInfoTooltipMessage] = useState()

  const history = useHistory()

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsPlaceRemoveConfirmPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpen(false)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(cardData) {
    setSelectedCard(cardData);
    setIsImagePopupOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((id) => id === currentUser._id);
    api
      .changeCardLikeStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.error('Ошибка при обновлении лайка: ', err));
  }

  function handleCardDelete(card) {
    setIsPlaceRemoveConfirmPopupOpen(true);
    setDeletedCard(card);
  }

  function handleCardDeleteComfifrmed(card) {
    return api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.error('Ошибка при удалении карточки: ', err));
  }

  function handleUpdateUser(newUserData) {
    return api
      .updateUserInfo(newUserData)
      .then((userDataFromServer) => {
        setCurrentUser(userDataFromServer);
      })
      .catch((err) =>
        console.error('Ошибка при обновлении информации о пользователе: ', err)
      );
  }

  function handleUpdateAvatar(newUserData) {
    return api
      .updateAvatar(newUserData)
      .then((userDataFromServer) => {
        setCurrentUser(userDataFromServer);
      })
      .catch((err) => console.error('Ошибка при обновлении аватара: ', err));
  }

  

  function handleAddPlaceSubmit(newCardData) {
    return api
      .addCard(newCardData)
      .then((addedCard) => setCards([addedCard, ...cards]))
      .catch((err) => console.error('Ошибка при добавлении карточки: ', err));
  }

  function handleLogin(email, password) {
    authApi
      .signin(email, password)
      .then((res) => {
        localStorage.setItem('JWT', res.token)
        setIsLoggedIn(true)
        setCurrentUser(res.user)
        history.push('/')
      })      
      .catch(console.error);
  }

  function handleLogout() {
    console.log('handleLogout called')
    setIsLoggedIn(false)
    setCurrentUser(defaultUser)
    localStorage.removeItem('JWT')
    history.push('/login')
  }

  function handleRegistration(email, password) {
    authApi.register(email, password)
      .then((data)=>{
        showInfoTooltip('tick','Вы успешно зарегистрировались!')
        handleLogin(email, password)
      })
      .catch((err)=>{
        console.error(err)
        showInfoTooltip('cross','Что-то пошло не так! Попробуйте ещё раз.')
      })
  }

  function showInfoTooltip(icon,message){
    setIsInfoTooltipOpen(true)
    setIsInfoTooltipIcon(icon)
    setInfoTooltipMessage(message)
  }
  
  /**
   * Effects
   */
  // check jwt token in localStorage
  useEffect(() => {
    console.log('check jwt effect called')
    const token = localStorage.getItem('JWT')
    if (token) {
      api.getUserInfo()
        .then((data) => {
          setIsLoggedIn(true)
          history.push('/')
        })
        .catch(err => console.error('Ошибка проверки токена авторизации:', err))
    }
  }, [history, setIsLoggedIn])

  // fetch api data on mount or login
  useEffect(() => {
    console.log('fetch user data and cards effect called')
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsArray]) => {
        setCurrentUser(userData);
        setCards(cardsArray);
      })
      .catch(console.error);
  }, [isLoggedIn, setCurrentUser]);

  // change images with arrowkeys in image popup
  useEffect(() => {
    function handleCardSwitch(e) {
      if (isImagePopupOpen) {
        const currentCardIndex = cards.indexOf(selectedCard);
        if (e.key === 'ArrowLeft' && currentCardIndex > 0)
          setSelectedCard(cards[currentCardIndex - 1]);
        if (e.key === 'ArrowRight' && currentCardIndex < cards.length - 1)
          setSelectedCard(cards[currentCardIndex + 1]);
      }
    }
    document.addEventListener('keydown', handleCardSwitch);
    return () => {
      document.removeEventListener('keydown', handleCardSwitch);
    };
  }, [isImagePopupOpen, cards, selectedCard]);

    

  return (
    
    <CurrentUserContext.Provider value={currentUser}>
        <div className='page'>
          <div className='page__content'>
            <Header email={currentUser.email} onLogout={handleLogout}/>
            <Switch>
              <Route path='/login'>
                <Login onLogin={handleLogin} />
              </Route>
              <Route path='/register'>
                <Register onRegister={handleRegistration}/>
              </Route>
              <ProtectedRoute path='/' exact loggedIn={isLoggedIn}>
                <Main
                  {...{ cards }}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              </ProtectedRoute>
            </Switch>
            <Footer />
          </div>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            isOpen={isImagePopupOpen}
          />
          <PlaceRemoveConfirmPopup
            isOpen={isPlaceRemoveConfirmPopupOpen}
            onClose={closeAllPopups}
            onDeleteConfirm={handleCardDeleteComfifrmed}
            deletedCard={deletedCard}
          />
          <InfoTooltip 
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            icon={infoTooltipIcon}
            message={infoTooltipMessage}/>
        </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
