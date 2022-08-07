import React from 'react';

function PopupWithForm({title='', name, isOpen, children, buttonText='', onClose, onSubmit}) { 

  function handleMouseDownOnOverlayAndCrossButton(evt) {
    if (evt.target.classList.contains('popup_opened') || //обработка нажатия левой кнопки мыши по оверлею
      evt.target.classList.contains('popup__close-btn')) //обработка нажатия левой кнопки мыши по кнопке-крестику
    {
      onClose()
    };
  }

  return (
   <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`} onMouseDown = {handleMouseDownOnOverlayAndCrossButton}>
    <div className="popup__container">
      <button className="popup__close-btn" type="button" aria-label="Кнопка закрытия всплывающего окна"></button>
      <form onSubmit={onSubmit} className="popup__form popup__change-profile-form" name={`${name}-form`}>
        {!(title==="") && <h3 className="popup__title">{title}</h3>}
        <fieldset className="popup__fieldset">
          {children}
          {!(buttonText==="") && <button type="submit" className="popup__button">{buttonText}</button>}
        </fieldset>
       </form>
      </div>
    </div>
    );
}

export default PopupWithForm;
