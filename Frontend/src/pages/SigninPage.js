/* eslint-disable jsx-a11y/anchor-is-valid */
export default function SigninPage() {
  return (
    <body>
      <link rel="stylesheet" href="./src/index.css"></link>
      <div className="container">
        <form className="form" id="login" method="post">
          <h1 className="form__title">Login</h1>
          <div className="form__message form__message--error"></div>
          <div className="form__input-group">
            <input
              autoFocus
              type="text"
              className="form__input"
              placeholder="Username or email"
            />
            <div className="form__input-error-message"></div>
          </div>
          <div className="form__input-group">
            <input
              autoFocus
              type="password"
              className="form__input"
              placeholder="Password"
            />
            <div className="form__input-error-message"></div>
          </div>
          <button className="form__button" type="submit">
            Continue
          </button>
          <p className="form__text">
            <a href="#" className="form__link">
              Forgot your password? (Still need to make reset password page)
            </a>
          </p>
          <p className="form__text">
            <a href="./" id="linkCreateAccount" className="form__link">
              Don't have an account? Sign up here
            </a>
          </p>
        </form>
        <form className="form form--hidden" id="createAccount" method="post">
          <h1 className="form__title">Create Account</h1>
          <div className="form__message form__message--error"></div>
          <div className="form__input-group">
            <input
              id="signupUsername"
              autoFocus
              type="text"
              className="form__input"
              placeholder="Username"
            />
            <div className="form__input-error-message"></div>
          </div>
          <div className="form__input-group">
            <input
              autoFocus
              type="text"
              className="form__input"
              placeholder="Email Address"
            />
            <div className="form__input-error-message"></div>
          </div>
          <div className="form__input-group">
            <input
              autoFocus
              type="password"
              className="form__input"
              placeholder="Password"
            />
            <div className="form__input-error-message"></div>
          </div>
          <div className="form__input-group">
            <input
              autoFocus
              type="password"
              className="form__input"
              placeholder="Confirm Password"
            />
            <div className="form__input-error-message"></div>
          </div>
          <button className="form__button" type="submit">
            Continue
          </button>
          <p className="form__text">
            <a href="./" id="linkLogin" className="form__link">
              Already have an account? Sign in
            </a>
          </p>
        </form>
      </div>
    </body>
  );
}

function setFormMessage(formElement, type, message) {
  const messageElement = formElement.querySelector(".form__message");

  messageElement.textContent = message;
  messageElement.classList.remove(
    "form__message--success",
    "form__message--error"
  );
  messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
  inputElement.classList.add("form__input-error");
  inputElement.parentElement.querySelector(
    ".form__input-error-message"
  ).textContent = message;
}

function clearInputError(inputElement) {
  inputElement.classList.remove("form__input--error");
  inputElement.parentElement.querySelector(
    ".form__input-error-message"
  ).textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login");
  const createAccountForm = document.querySelector("#createAccount");

  document
    .querySelector("#linkCreateAccount")
    .addEventListener("click", (e) => {
      e.preventDefault();
      loginForm.classList.add("form--hidden");
      createAccountForm.classList.remove("form--hidden");
    });

  document.querySelector("#linkLogin").addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.remove("form--hidden");
    createAccountForm.classList.add("form--hidden");
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    //Perform fetch login, message may be set on PHP backend side

    setFormMessage(loginForm, "error", "Invalid username/password combination");
  });

  document.querySelectorAll(".form__input").forEach((inputElement) => {
    inputElement.addEventListener("blur", (e) => {
      if (
        e.target.id === "signupUsername" &&
        e.target.value.length > 0 &&
        e.target.value.length < 5
      ) {
        setInputError(
          inputElement,
          "Username must be at least 5 characters in length"
        );
      }
    });

    inputElement.addEventListener("input", (e) => {
      clearInputError(inputElement);
    });
  });
});
