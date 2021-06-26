import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('email@123.com');
  const [password, setPassword] = useState('');

  function submitHandler(e) {
    e.preventDefault();
    onLogin(email, password)
  }

  return (
    <div className='page__section'>
      <form onSubmit={submitHandler} className="form form_login">
        <p className="form__title form__title_login">Вход</p>
        <input placeholder='Email' type='email' value={email} onChange={e=>setEmail(e.target.value)}  className='form__input form__input_login'/>
        <input placeholder='Пароль' type='password' value={password} onChange={e=>setPassword(e.target.value)} className='form__input form__input_login'/>
        <button type='submit' className='form__submit form__submit_login'>Войти</button>
      </form>
    </div>
  )
}

export default Login