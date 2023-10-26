function ImagePopup(props) {
  return (
    <section className={`popup popup_open-card ${props.isOpen && "popup_opened"}`}>
      <div className="popup__container popup__container_open-card">
        <button
          type="button"
          className="popup__close-button popup__close-button_open-card"
          onClick={props.onClose}
        />
        {props.selectedCard && (
          <img
            alt={props.selectedCard.name}
            src={props.selectedCard.link}
            className="popup__image"
          />
        )}
        {props.selectedCard && (
          <h2 className="popup__title popup__title_open-card">
            {props.selectedCard.name}
          </h2>
        )}
      </div>
    </section>
  );
}



export default ImagePopup;