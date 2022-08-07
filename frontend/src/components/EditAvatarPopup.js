import React, {useEffect, useRef} from 'react';

import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}){

    const avavtarUrlInput = useRef();

    useEffect(()=>{
          avavtarUrlInput.current.value='';
        },[isOpen] 
    );

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateAvatar({
          avatar: avavtarUrlInput.current.value,
        });
      } 

    return (
        <PopupWithForm 
            title="Обновить аватар"
            name="change-avatar" 
            isOpen={isOpen} 
            buttonText="Сохранить"
            onClose={onClose}
            onSubmit={handleSubmit} >
            <input 
                type="url" className="popup__input popup__input_type_link"
                name="avatar" id="avatar-url-input" placeholder="Ссылка на аватар" required 
                ref={avavtarUrlInput} 
            />
            <span className="popup__error avatar-url-input-error"></span>
        </PopupWithForm>
    );
} 

export default EditAvatarPopup;