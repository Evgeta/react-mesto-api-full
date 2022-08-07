import React from 'react';
import PopupWithForm from './PopupWithForm';

import successIcon from './../images/success_registration.svg';
import errorIcon from './../images/registration_error.svg';

function InfoTooltip({isOpen, onClose, popupInfo}) {
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
    >
    <img src={ (popupInfo.status==='success')?successIcon:errorIcon} alt="Состояние авторизации" className="popup__icon" />
    <p className="popup__text">{popupInfo.popupMessage}</p>
    </PopupWithForm>
  );
}

export default InfoTooltip;
