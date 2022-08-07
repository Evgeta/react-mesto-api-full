import React from 'react';

import {useEffect, useState} from 'react';

import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace}){

    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(()=>{
        setName('');
        setLink('');
        },[isOpen] 
    );
 
    function handleNameChange(e){setName(e.target.value)};
    function handleLinkChange(e){setLink(e.target.value)};
        
    function handleSubmit(e){
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onAddPlace({
           name,
           link      
        });
    }

    return (
        <PopupWithForm 
            title="Новое место"
            name="edit-new-place" 
            isOpen={isOpen} 
            buttonText="Создать"
            onClose={onClose}
            onSubmit={handleSubmit} >
            <input 
              type="text" className="popup__input popup__input_type_name"
              name="name" id="place-name-input" placeholder="Название места" required minLength="2" maxLength="40"
              value={name} onChange={handleNameChange}
            />
            <span className="popup__error name-input-error"></span>
            <input type="url" className="popup__input  popup__input_type_link" name="about" 
              id="link-input" placeholder="Ссылка на место" required 
              value={link} onChange={handleLinkChange}
            />
            <span className="popup__error about-input-error"></span>
        </PopupWithForm>
    );
} 

export default AddPlacePopup;