import React, { useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import logo from '../images/logo.svg';
import burgerBtnSvg from '../images/burger-btn.svg';
import closeBtn from '../images/close-btn.svg'

const Header = ({ email, onLogout }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  function toggleDrawer() {
    setIsDrawerOpen(!isDrawerOpen)
  }

  const drawerClassName = `header__drawer ${isDrawerOpen ? 'header__drawer_open' : ''}`

  return (
    <header className='header page__header'>
      <div className={drawerClassName}>
        <div className='header__drawer-content'>
          <Route path='/' exact>
            <span className='header__email'>{email}</span>
            <button onClick={onLogout} className='header__button'>
              Выйти
          </button>
          </Route>
        </div>
      </div>
      <div className='header__content'>
        <img className='logo' src={logo} alt='логотип Место' />
        <div className='header__menu'>
          <span className='header__email'>{email}</span>
          <Switch>
            <Route path='/login'>
              <Link to='/register' className='header__button'>
                Регистрация
              </Link>
            </Route>
            <Route path='/register'>
              <Link to='/login' className='header__button'>
                Войти
              </Link>
            </Route>
            <Route path='/'>
              <button onClick={onLogout} className='header__button'>
                Выйти
              </button>
            </Route>
          </Switch>
        </div>
        <button onClick={toggleDrawer} className='header__burger-btn' style={{backgroundImage: `url(${isDrawerOpen ? closeBtn : burgerBtnSvg})`}} aria-label='открыть / закрыть меню'></button>
      </div>
    </header>
  );
};

export default Header;
