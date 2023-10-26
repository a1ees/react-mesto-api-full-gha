import React, { useContext } from 'react';
import avatarLogo from '../images/logo/avatarlogo.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header.js';
import Card from './Card';

function Main(props) {
  const user = useContext(CurrentUserContext);
  return(
  <main className="content">
    <Header name="Выйти" buttonStyle={{color:"#A9A9A9"}} profileEmail={props.profileEmail} sign={props.sign} />
    <section className="profile">
      <div onClick={props.onEditAvatar} className="profile__avatar-container">
        <img
          alt="Редактор"
          src={avatarLogo}
          className="profile__avatar-edit"
        />
        <img alt="Аватар" src={user.avatar} className="profile__avatar" />
      </div>
      <div className="profile__info">
        <h1 className="profile__name">{user.name}</h1>
        <button
          onClick={props.onEditProfile}
          type="button" 
          className="profile__edit-button" 
        />
        <p className="profile__profession">{user.about}</p>
      </div>
      <button
        onClick={props.onAddPlace}
        type="button" 
        className="profile__add-button" 
      />
    </section>
    <section className="cards">
    {props.cards.map((card) => (
      <Card onCardDelete={props.onCardDelete} onCardLike={props.onCardLike} key={card._id} card={card} onCardClick={() => props.onCardClick(card)} />
    ))}
    </section>
  </main>
  )
}

export default Main;