import React, {useEffect, useContext, useState} from 'react';

import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({isOpen, onClose, onUpdateUser}){

    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(()=>{
        setName(currentUser.name);
        setDescription(currentUser.about);
        },[currentUser, isOpen] 
    );

    function handleNameChange(e){
        setName(e.target.value);        
    };


    function handleDescriptionChange(e){setDescription(e.target.value)};

    function handleSubmit(e){
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
           name,
           about: description,      
        });
    }

    return (
        <PopupWithForm 
            title="Редактировать профиль"
            name="edit-profile" 
            isOpen={isOpen} 
            buttonText="Сохранить"
            onClose={onClose}
            onSubmit={handleSubmit} >
            <input 
              type="text" className="popup__input popup__input_type_name"
              name="name" id="name-input" placeholder="Имя" required minLength="2" maxLength="40"
              value={name} onChange={handleNameChange}
            />
            <span className="popup__error name-input-error"></span>
            <input type="text" className="popup__input popup__input_type_about" name="about" 
              id="about-input" placeholder="О себе" required minLength="2" maxLength="200"
              value={description} onChange={handleDescriptionChange}
            />
            <span className="popup__error about-input-error"></span>
        </PopupWithForm>
    );
} 

export default EditProfilePopup;