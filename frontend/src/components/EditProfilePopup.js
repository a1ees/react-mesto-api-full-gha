import React, { useState, useEffect } from "react";
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {

  const [name, setName] = useState('');
  const [about, setAbout] = useState('')
  const [errorName, setErrorName] = useState('')
  const [errorProfession, setErrorProfession] = useState('')

  const currentUser = React.useContext(CurrentUserContext);
  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, props.isOpen]);
  
  const handleNameChange = (event) => {
    setErrorName(event.target.validationMessage)
    setName(event.target.value);
  };

  const handleAboutChange = (event) => {
    setErrorProfession(event.target.validationMessage)
    setAbout(event.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    // передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      about: about,
    });
  } 

  return(
    <PopupWithForm name="edit-profile" title="Редактировать профиль" setValid={props.setValid} isValid={props.isValid} isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonText="Сохранить">
    <label className="popup__item popup__item_name">
      <input
        id="name-input"
        className="popup__input popup__input_name"
        type="text"
        name="name"
        minLength={2}
        maxLength={40}
        required
        value={name}
        onChange={handleNameChange}
      />
      <span className={`name-input-error popup__input-error ${!props.isValid && 'popup__input-error_visible'}`}>{errorName}</span>
    </label>
    <label className="popup__item popup__item_profession">
      <input
        id="profession-input"
        className="popup__input popup__input_profession"
        type="text"
        name="about"
        minLength={2}
        maxLength={200}
        required
        value={about}
        onChange={handleAboutChange}
      />
      <span className={`profession-input-error popup__input-error ${!props.isValid && 'popup__input-error_visible'}`}>{errorProfession}</span>
    </label>
  </PopupWithForm>
  )
}

export default EditProfilePopup;