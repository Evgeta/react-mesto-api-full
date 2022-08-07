import React, { useState }  from "react";
  
function Login({handleLogin}) {
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
    handleLogin(password, email);
  }
  return (
    <div className="page-dialog">
      <form className="page-dialog__form" onSubmit={handleSubmit}>
        <h2 className="page-dialog__title">Вход</h2>
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
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
