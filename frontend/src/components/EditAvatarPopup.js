import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";
function EditAvatarPopup(props) {
  const avatarRef = React.useRef(null);
  const [errorAvatar, setErrorAvatar] = useState('')

  //сделал заготовку для валидации
  const handleAvatarChange = (event) => {
    setErrorAvatar(event.target.validationMessage)
  };
  
  function closeAvatar() {
    props.onClose()
    avatarRef.current.value = "";
  }

  function handleSubmit(e) {
    e.preventDefault();
    const inputValue = avatarRef.current.value;
    props.onUpdateAvatar({
      avatar: inputValue,
    });
    avatarRef.current.value = "";
  } 

  return(
    <PopupWithForm name="edit-avatar" title="Обновить аватар" setValid={props.setValid} isValid={props.isValid} isOpen={props.isOpen} onClose={closeAvatar} onSubmit={handleSubmit} buttonText="Да">
    <label className="popup__item popup__item_avatar">
      <input
        ref={avatarRef}
        id="avatar-input"
        className="popup__input popup__input_avatar"
        type="URL"
        name="avatar"
        required
        onChange={handleAvatarChange}
      />
      <span className={`avatar-input-error popup__input-error ${!props.isValid && 'popup__input-error_visible'}`}>{errorAvatar}</span>
    </label>
  </PopupWithForm>
  )
}

export default EditAvatarPopup;