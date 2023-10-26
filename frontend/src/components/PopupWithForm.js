import React from "react";

function PopupWithForm(props) {
  const formRef = React.useRef(null);
  const handleFormChange = () => {
    props.setValid(formRef.current.checkValidity())
  }
  return (
    <section className={`popup popup_${props.name} ${props.isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          type="button"
          className={`popup__close-button popup__close-button_${props.name}`}
          onClick={props.onClose}
        />
        <h2 className="popup__title">{props.title}</h2>
        <form ref={formRef} onChange={handleFormChange} onSubmit={props.onSubmit} className={`popup__form popup__form_${props.name}`}>
          {props.children}
          <button
            type="submit"                                                   //заготовка, тест
            className={`popup__button popup__button_${props.name} ${!props.isValid && 'popup__button_disabled'}`}
            disabled={!props.isValid}
          >
            {props.buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}


export default PopupWithForm;