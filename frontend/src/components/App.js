import React, { useEffect, useState } from 'react';
import '../index.css';
import Header from './Header.js';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Footer from './Footer';
import { api } from '../utils/Api';
import Main from './Main';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { auth } from '../utils/Auth';
import { useNavigate } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSignIn, setSignIn] = useState(true);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({ name: '', about: '', avatar: '', _id: '' });
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [profileEmail, setProfileEmail] = useState('')
  const navigate = useNavigate();
  const [textTooltip, setTextTooltip] = useState('')
  const [logoTooltip, setlogoTooltip] = useState('')
  const [isValid, setValid] = useState(false)

  const handleValidChange = (valid) => {
    setValid(valid)
  }

  const handleTextTooltip = (text) => {
    setTextTooltip(text)
  }

  const handleLogoTooltip = (logo) => {
    setlogoTooltip(logo)
  }

  const getEmail = (email) => {
    setProfileEmail(email)
  }

  const resetForm = () => {
    setPassword('');
    setEmail('')
  }

  const resetPassword = () => {
    setPassword('');
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const getPagesItem = () => {
    api.getUserInfo()
    .then((userInfo) => {
      setCurrentUser(userInfo);
    })
    .catch(error => {
      console.error('Ошибка при получении данных:', error);
    });

    api.getCardsItem()
      .then((cardsData) => {
        setCards(cardsData)
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
      });
      auth.checkToken()
      .then((data) => {
        setLoggedIn(true)
        navigate('/')
        setProfileEmail(data.email)
      })
      
      .catch((err) => {
        console.log(err)
      })
  }


    useEffect(() => {
      getPagesItem()
  }, [])
  
  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleInfoTooltip() {
    setInfoTooltipOpen(true)
  }
  
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }
  
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }
  
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }
  
    //создали функцию лайка/дизлайка
    function handleCardLike(card) {
      // проверка лайка на карточке методом перебора массива и поиском хотя бы одного удоволетворяющего условия(i._id === currentUser._id) 
      const isLiked = card.likes.some(item => item === currentUser._id);
      //делаем запрос к апи
      api.changeLikeCardStatus(card._id, isLiked)
      //обновленное состояние карточки после изменения лайка
      .then((newCard) => {
        // обновили состояние массива cards
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
      });
  }
  
  function handleUpdateUser({ name, about }) {
    api.sendUserInfo({ name, about })
    .then((onUpdateUser) => {
      setCurrentUser(onUpdateUser)
      closeAllPopups()
      setValid(false)
    })
    .catch(error => {
      console.error('Ошибка при отправке:', error);
    });
  }
  
  function handleUpdateAvatar(avatar) {
    api.sendAvatar(avatar)
    .then((onUpdateAvatar) => {
      setCurrentUser(onUpdateAvatar)
      closeAllPopups()
      setValid(false)
    })
    .catch(error => {
      console.error('Ошибка при отправке:', error);
    });
  }
  
  function handleAddPlaceSubmit(name, link) {
    api.sendCard(name, link)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      setValid(false)
      closeAllPopups()
    })
    .catch(error => {
      console.error('Ошибка при отправке:', error);
    });
  }
  
  function handleCardDelete(cardToDelete) {
    //делаем запрос к апи для удаления карточки, передали в параметр card id
    api.deleteCard(cardToDelete._id)
    .then(() => {
      // обновили состояние массива cards исключив удаленную карточку
      setCards((state) => state.filter(card => card._id !== cardToDelete._id))
    })
    .catch(error => {
      console.error('Ошибка при получении данных:', error);
    });
  }
  
  function closeAllPopups() {
    setEditAvatarPopupOpen(false)
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setInfoTooltipOpen(false)
    setSelectedCard({ name: '', link: '' })
  }

  const handleSign = () => {
    setSignIn(!isSignIn);
  }

  const handleLogin = () => {
    setLoggedIn(!loggedIn);
  }

  const singOut = () => {
    localStorage.removeItem('userId')
    auth.clearCookie()
    handleLogin()
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Routes>
            <Route path="/" element={<ProtectedRoute
              element={Main}
              profileEmail={profileEmail}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
              sign={singOut}
              loggedIn={loggedIn} />} 
            />
            <Route path="/" element={<Footer />} />
            <Route path='/sign-in' element={ isSignIn ?
               (<div><Header sign={handleSign} name='Регистрация' />
               <Login 
                password={password} 
                email={email} 
                getPages={getPagesItem}
                onPasswordChange={handlePasswordChange}
                onEmailChange={handleEmailChange}
                onInfoTooltip={handleInfoTooltip}
                onClose={closeAllPopups}
                handleLogin={handleLogin}
                resetForm={resetForm}
                resetPassword={resetPassword}
                getEmail={getEmail}
                setText={handleTextTooltip}
                setLogo={handleLogoTooltip} />
                
               </div>) :
                (<Navigate to="/sign-up" />)} 
            />

            <Route path='/sign-up' element={ isSignIn ?
               (<Navigate to="/sign-in" />) :
                (<div><Header sign={handleSign} name='Войти' />
                <Register 
                  password={password}
                  email={email}
                  onPasswordChange={handlePasswordChange}
                  onEmailChange={handleEmailChange}
                  sign={handleSign}
                  onInfoTooltip={handleInfoTooltip}
                  onClose={closeAllPopups}
                  resetForm={resetForm}
                  setText={handleTextTooltip}
                  setLogo={handleLogoTooltip} />
                </div>)} 
            />
          </Routes>
          <EditProfilePopup setValid={handleValidChange} isValid={isValid} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} /> 
      
          <AddPlacePopup setValid={handleValidChange} isValid={isValid} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
      
          <EditAvatarPopup setValid={handleValidChange} isValid={isValid} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} /> 
      
          <PopupWithForm name="delete-card" title="Вы уверены?" buttonText="Да" />
          <ImagePopup
            isOpen={selectedCard.name !== ''}
            onClose={closeAllPopups}
            selectedCard={selectedCard}
          />
          <InfoTooltip onClose={closeAllPopups} isOpen={isInfoTooltipOpen} toolTipText={textTooltip} toolTipLogo={logoTooltip} />
          {loggedIn && <Footer />}
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

