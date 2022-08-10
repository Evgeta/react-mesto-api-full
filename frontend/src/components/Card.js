import React from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import deleteIcon from '../images/delete_icon.svg';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = (`gallery__delete-icon ${!isOwn && 'gallery__delete-icon_hidden'}`); 
  const isLiked = card.likes.some(i =>  i === currentUser._id );
  const cardLikeButtonClassName = (`gallery__heart ${isLiked && 'gallery__heart_active'}`);  

  function handleLikeClick(card) {
    onCardLike(card);
  }
 
  function handleDeleteClick(card) {
    onCardDelete(card);
  }
 
  return (
     <article className="gallery__item">
        <img className="gallery__image" src={card.link} alt={card.name} onClick={() => {onCardClick(card)}} />
          <button className={cardDeleteButtonClassName} type="button" onClick={() => {handleDeleteClick(card)}}>
            <img src={deleteIcon} alt="Удалить место" />
           </button>
            <div className="gallery__place-info">
              <h2 className="gallery__place-name">{card.name}</h2>
              <div className="gallery__like-info">
                <button className={cardLikeButtonClassName} type="button" aria-label="Кнопка лайка" onClick={() => handleLikeClick(card)}></button>
                <span className="gallery__like-count">{card.likes.length}</span>
              </div>
            </div>
    </article>
  );
}

export default Card;