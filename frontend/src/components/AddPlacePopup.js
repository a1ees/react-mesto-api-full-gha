import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = useState('')
  const [link, setLink] = useState('')
  const [errorName, setErrorName] = useState('')
  const [errorLink, setErrorLink] = useState('')

  const handleNameChange = (event) => {
    setErrorName(event.target.validationMessage)
    setName(event.target.value);
  };

  const handleLinkChange = (event) => {
    setErrorLink(event.target.validationMessage)
    setLink(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onAddPlace(name, link)
  }

  React.useEffect(() => {
    setName('');
    setLink('');
}, [props.isOpen]); 

  return(
    <PopupWithForm name="add-" title="Новое место" buttonText="Сохранить" setValid={props.setValid} isValid={props.isValid} isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
    <label className="popup__item popup__item_place">
      <input
        id="place-input"
        className="popup__input popup__input_place"
        type="text"
        placeholder="Название"
        name="place"
        minLength={2}
        maxLength={30}
        required
        onChange={handleNameChange}
        value={name}
      />
      <span className={`place-input-error popup__input-error ${!props.isValid && 'popup__input-error_visible'}`}>
        {errorName}
      </span>
    </label>
    <label className="popup__item popup__item_place-pic">
      <input
        id="place-pic-input"
        className="popup__input popup__input_place-pic"
        type="url"
        placeholder="Ссылка на картинку"
        name="placepic"
        required
        onChange={handleLinkChange}
        value={link}
      />
      <span className={`place-pic-input-error popup__input-error ${!props.isValid && 'popup__input-error_visible'}`}>
      {errorLink}
      </span>
    </label>
  </PopupWithForm>
  )
}

export default AddPlacePopup;