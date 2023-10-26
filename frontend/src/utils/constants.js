export const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__input-error_visible'
};

export const cardsItems = '#cards__item';
export const cardsContainer = '.cards';

export const apiConfig = {
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
}

export const authConfig = {
  baseUrl: 'http://localhost:3000'
}
