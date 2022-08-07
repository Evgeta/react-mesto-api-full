import React, { useState }  from "react";
import { Link } from 'react-router-dom';
  
function Register({
  handleRegistration
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);  
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleRegistration(password, email);
  }
  return (
    <div className="page-dialog">
      <form className="page-dialog__form" onSubmit={handleSubmit}>
        <h2 className="page-dialog__title">Регистрация</h2>
        <input
          className="page-dialog__input"
          placeholder="Email"
          name="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          className="page-dialog__input"
          placeholder="Пароль"
          name="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button
          className="page-dialog__button"
          type="submit"
        >
          Зарегистрироваться
        </button>
      </form>
      <div className="page-dialog__link-container">
        <p className="page-dialog__text">Уже зарегистрированы?&nbsp;</p>
        <Link to="/sign-in" className="page-dialog__link">Войти</Link>
      </div>
    </div>
  );
}

export default Register;
