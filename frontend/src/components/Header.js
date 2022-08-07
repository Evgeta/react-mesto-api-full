import React from 'react';
import { Link, Switch, Route } from "react-router-dom";

import logoMesto from '../images/logo-mesto.svg';

function Header({userEmail, onSignOut}) {
  return (
      <header className="header">
        <img className="header__logo" src={logoMesto}  alt="Логотип Место Россия" />
        <Switch>
        <Route exact path="/">
          <div className="header__info">
             <p className="header__email">{userEmail}</p> 
             <Link className="header__link"
              onClick={onSignOut}
              to="/sign-in"
            >
              Выйти
            </Link>
          </div>
        </Route>
        <Route path="/sign-up">
          <Link className="header__link" to="/sign-in">
            Войти
          </Link>
        </Route>
        <Route path="/sign-in">
          <Link className="header__link" to="/sign-up">
            Регистрация
          </Link>
        </Route>
      </Switch> 
      </header>
    );    
}

export default Header;
