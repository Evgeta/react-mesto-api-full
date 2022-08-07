 import React from 'react';
 
 import PopupWithForm from './PopupWithForm';

 function DeleteCardPopup({
     isOpen,
     onClose,
     onDelete
 }) {

     function handleSubmit(e) {
         // Запрещаем браузеру переходить по адресу формы
         e.preventDefault();
         onDelete();
     }

     return ( 
     <PopupWithForm title = "Вы уверены?"
         name = "edelete-card"
         isOpen = {isOpen}
         buttonText = "Да"
         onClose = {onClose}
         onSubmit = {handleSubmit}>
     </PopupWithForm>
     );
 }
 
 export default DeleteCardPopup;