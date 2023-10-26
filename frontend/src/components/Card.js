import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card(props) {
  const handleLikeClick = () => {
    // Вызываем функцию из пропса, передавая карточку
    props.onCardLike(props.card);
  };
  const handleCardDelete = () => {
    // Вызываем функцию из пропса, передавая карточку
    props.onCardDelete(props.card);
  };
  const user = useContext(CurrentUserContext);
  const isOwn = props.card.owner === user._id;
  const isLiked = props.card.likes.some(i => i === user._id);
  return(
    <div className="cards__item">
      {isOwn && 
      <button 
      type="button" 
      className="cards__remove-btn"
      onClick={handleCardDelete}
      />}
        <img className="cards__image" 
        src={props.card.link}
        alt={props.card.name}
        onClick={props.onCardClick}
       />
      <div className="cards__content">
        <h2 className="cards__title">{props.card.name}</h2>
        <div className="cards__like">
           <button onClick={handleLikeClick} type="button" className={`cards__btn ${isLiked && 'cards__btn_active'}`} />
           <div className="cards__like-sum" />{props.card.likes.length}</div>
       </div>
    </div>
  )
}