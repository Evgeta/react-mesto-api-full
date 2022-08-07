import React from 'react';

function ImagePopup({card, onClose}) { 
  return (
      <div className={`popup popup_big-image ${card ? 'popup_opened': ''}`} 
       onClick={(e) => {if (e.target === e.currentTarget) onClose()}}
      >
        <div className="popup__image-container">
          <button className="popup__close-btn" type="button" aria-label="Кнопка закрытия всплывающего окна" onClick={onClose}></button>
          <figure className="popup__figure">
            <img className="popup__big-image" src={card ? card.link : ""} alt=""/>
            <figcaption className="popup__image-caption">{card ? card.name : ""}</figcaption>
          </figure>
        </div>
    </div>
    );
} 

export default ImagePopup;