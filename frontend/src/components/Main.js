import React, {useContext}  from 'react';

import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
    onEditProfile, 
    onAddPlace,
    onEditAvatar,
    cards,
    onCardClick,
    onCardLike,
    onDeleteIconClick
}){
  const currentUser = useContext(CurrentUserContext);
  return (
     <main className="content">
        <section className="profile">
          <div className="profile__left-block">
            <div className="profile__avatar-with-button">
              <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }} />
              <button className="profile__avatar-pen" onClick={onEditAvatar}></button>
            </div>
            <div className="profile__info">
              <div className="profile__name-edit-btn">
                <h1 className="profile__name">{currentUser.name}</h1>
                <button className="profile__edit-btn" value="edit-btn" type="button"
                  aria-label="Кнопка редактирования профиля" onClick={onEditProfile}></button>
              </div>
              <p className="profile__about-me">{currentUser.about}</p>
            </div>
          </div>
          <button className="profile__add-btn" value="add-btn" type="button" aria-label="Кнопка добавления места" onClick={onAddPlace}></button>
        </section>
        <section className="gallery">
          {
            cards.map((card) => ( 
             <Card
              key = {card._id}
              card = {card}
              onCardClick = {onCardClick}
              onCardLike = {onCardLike}
              onCardDelete = {onDeleteIconClick}
             />
            ))
          }
        </section>
    </main>
    );    
}

export default Main;
