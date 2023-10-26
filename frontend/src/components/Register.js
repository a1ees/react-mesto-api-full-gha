import React from "react";
import AuthForm from "./AuthForm";
import { auth } from "../utils/Auth";
import AuthLogoSucces from '../images/logo/AuthLogoSucces.svg'
import AuthLogoError from '../images/logo/AuthLogoError.svg'

function Register(props) {

  function registerSucces() {
    props.setText('Вы успешно зарегистрировались!')
    props.setLogo(AuthLogoSucces)
    props.onInfoTooltip()
  }

  function registerError() {
    props.setLogo(AuthLogoError)
    props.setText('Что-то пошло не так! Попробуйте ещё раз.')
    props.onInfoTooltip()
  }

  function registration(e) {
    e.preventDefault();
    auth.register(props.email, props.password)
    .then(() => {
      registerSucces()
      props.resetForm();
    })
    .catch(() => {
      registerError()
      props.resetForm();
    })
  }

  return (
    <div>
      <AuthForm title='Регистрация' buttonText='Зарегистрироваться' onSubmit={registration} onClose={props.onClose}>
          <label className="authform__item">
            <input className="authform__input" placeholder="Email" value={props.email} onChange={props.onEmailChange} />
          </label>
          <label className="authform__item">
            <input className="authform__input " type="password" placeholder="Пароль" value={props.password} onChange={props.onPasswordChange} />
          </label>
          <button
            type="submit"
            className="authform__button"
          >
            Зарегистрироваться
          </button>
        <button 
          onClick={props.sign}
          type="button" 
          className="authform__skip-button">Уже зарегистрированы? Войти</button>
      </AuthForm>
    </div>
  );
}

export default Register;