import React, { useState, useEffect } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import InfoTooltip from './InfoTooltip';

import Login from "./Login";
import Register from "./Register";

import {Route, Switch, useHistory, Redirect } from 'react-router-dom';

import ProtectedRoute from "./ProtectedRoute"; // импортируем HOC

import {
  api
} from '../utils/Api.js';

import {
  CurrentUserContext
} from '../contexts/CurrentUserContext';

import * as auth from "../utils/auth.js";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);

  const [cards, setCards] = useState([]);

  const [currentUser, setCurrentUser] = useState({
    name: '',
    link: '',
    about: ''
  });

  
  const [loggedIn, setLoggedIn] = useState(false);
  // const [registered, setRegistered] = useState(false);
  const [userEmail, setUserEmail] = useState("Начало");

  const [popupInfo, setPopupInfo] = useState({
    status: '',
    popupMessage: ''
  });
  
  let history = useHistory();

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  }

  const handleDeletePopupOpen = (card) => {
    setCardToDelete(card);
    setDeleteCardPopupOpen(true);    
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setDeleteCardPopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
    setPopupInfo({
      iconPath: '',
      popupMessage: ''
    });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(`Ошибка: ${err.status}`)
    })
  }

  function handleCardDelete() {
    api.deleteCard(cardToDelete._id).then((res) => {
      setCards((state) => state.filter((c) => c._id !== cardToDelete._id && c));
      closeAllPopups(); 
    })
    .catch((err) => {
      console.log(`Ошибка: ${err.status}`)
    })   
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(user) {
      api.setUserInfo(user)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.status}`)
      })
  }

  function handleUpdateAvatar(user) {
    api.setAvatar(user)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.status}`)
      })
  }

  function handleAddPlace(card) {
    api.addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.status}`)
      })
  }

  useEffect(() => {
      api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
        setLoggedIn(true);
       // setProfileEmail(res.email);
        console.log('Ответ на запрос о пользователе');
        console.log(res);
        history.push('/');
      })
      .catch((err) => {
        console.log('Ответ на запрос о пользователе - catch');
        console.log(err);
        setLoggedIn(false);
        history.push('/sign-in')
      });

       api.getInitialCards()
       .then((cardsFromServer) => {
         setCards(cardsFromServer);
      })
      .catch((err) => {
        console.log(`Вы не авторизованы`);
        console.log(`Ошибка: ${err.status}`)
      })
    }, [history, loggedIn])

// //проверка токена пользователя при монтировании App
// useEffect(() => {
//   const jwt = localStorage.getItem('jwt');
//   if (jwt) {
//     auth.checkToken(jwt)
//       .then((res) => {
//         if (res) {
//           setLoggedIn(true);
//           setUserEmail(res.data.email);
//           history.push('/');
//         }
//       })
//       .catch(err => console.log(err));
//   }
// }, [history]);

function handleRegistration(password, email) {
  auth.register(password, email).then(
    (res) => {
      if (res.data) {
        setPopupInfo({
          status: 'success',
          popupMessage: 'Вы успешно зарегистрировались!'
        })
      // setRegistered(true);
       setIsInfoTooltipOpen(true);
       history.push("/sign-in");
      }
    })
    .catch((err) => {
          setPopupInfo({
          status: 'error',
          popupMessage: 'Что-то пошло не так! Попробуйте ещё раз.'
        })
        setIsInfoTooltipOpen(true);
      })
    }

  function handleLogin(password, email) {
   auth.authorize(password, email)
   .then ((data) => {
      if(data) {
        setLoggedIn(true);
        setUserEmail(email);
        setPopupInfo({
          status: 'success',
          popupMessage: 'Вы успешно вошли на закрытую часть сайта!'
        }) }
        else {
        setIsInfoTooltipOpen(true);
        }
      history.push("/");
      }
      )
      .catch((err) => {
         setPopupInfo({
          status: 'error',
          popupMessage: 'Что-то пошло не так! Попробуйте ещё раз.'
        })
        setIsInfoTooltipOpen(true);
        setLoggedIn(false);
      })
  }
  
    // Выход 
    function handleSignOut() {
      setLoggedIn(false);
      localStorage.removeItem('jwt');
      setUserEmail('');
      history.push('/sign-up');
    }

  return (
  <div className="page">
   <div className="page__container">
   <CurrentUserContext.Provider value={currentUser}>
      <Header userEmail={userEmail}  onSignOut={handleSignOut}/>
    
    <Switch> 
      <Route path="/sign-in">
        <Login handleLogin={handleLogin}/>
      </Route>
      <Route path="/sign-up">
        <Register handleRegistration={handleRegistration}/>
      </Route>
         <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick} 
            onEditAvatar={handleEditAvatarClick} 
            cards={cards}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onDeleteIconClick={handleDeletePopupOpen}
            component={Main}
          >
        </ProtectedRoute>
    {loggedIn && <Footer />}

   <EditProfilePopup 
      isOpen={isEditProfilePopupOpen} 
      onClose={closeAllPopups}
      onUpdateUser={handleUpdateUser}
    />  
     
     <AddPlacePopup 
      isOpen={isAddPlacePopupOpen} 
      onClose={closeAllPopups}
      onAddPlace={handleAddPlace}
    /> 

    <EditAvatarPopup
      isOpen={isEditAvatarPopupOpen}
      onClose={closeAllPopups}
      onUpdateAvatar = {handleUpdateAvatar}
     /> 

    <DeleteCardPopup 
      isOpen={isDeleteCardPopupOpen} 
      onClose={closeAllPopups} 
      onDelete={handleCardDelete}
    /> 

    <ImagePopup 
      card={selectedCard} 
      onClose={closeAllPopups}
    />

<Route exact path="/">
    {loggedIn ? (
      <Redirect to="/sign-in" />
    ) : (
      <Redirect to="/sign-up" />
      )}
   </Route>
  </Switch>
  </CurrentUserContext.Provider>

  <InfoTooltip
      isOpen={isInfoTooltipOpen}
      onClose={closeAllPopups}
      popupInfo={popupInfo}
   />
    {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
  </div>
</div>

);}

export default App;
