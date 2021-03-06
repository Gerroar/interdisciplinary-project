/* eslint-disable jsx-a11y/anchor-is-valid */
import { useNavigate } from "react-router-dom";
import imgPlaceholder from "../assets/img/user-placeholder.jpg";
/**We use setAuth to check in future pages that
 * the user is authenticated and is not browsing
 * the HomePage as a stranger. */

export default function HandleInfoPage({ setAuth }) {
  //Just in case that we get an error fetching data
  const navigate = useNavigate();

  async function handleSignIn(event) {
    event.preventDefault();
    const useroremail = event.target.useroremail.value; //value of posible user or posible email from input
    const password = event.target.password.value; //password value from input
    const loginObject = { useroremail: useroremail, password: password }; //object that we pass to php and it's taken by php://input

    /**Here I'm using 8000 port because I'm working with that port to avoid conflict
     * between react and php, this URL will change when we upload the project to a server
     */
    const response = await fetch(
      "http://localhost:8000/Backend/auth/index.php?action=login",
      {
        method: "POST",
        body: JSON.stringify(loginObject),
      }
    );

    const data = await response.json();

    if (data.authenticated) {
      localStorage.setItem("isAuth", true);
      localStorage.setItem("authUser", JSON.stringify(data.user));
      //setAuth(true);
      navigate("/home");
    } else {
      localStorage.removeItem("isAuth");
      localStorage.removeItem("authUser");
      const stringData = JSON.stringify(data.error);
      document.getElementById("popup-label-signin").innerHTML =
        stringData.replaceAll('"', "");

      openSigninPopup();
    } //end if-else data.authenticated
  } //end of handleSignIn

  async function handleSignUp(event) {
    event.preventDefault();
    const username = event.target.username.value; //value of username
    const email = event.target.email.value; //value of email
    const password = event.target.password.value; //password value from input
    const passwordConfirm = event.target.passwordConfirm.value; //password confirm value from input
    const phoneNumber = event.target.phoneNumber.value; //value of phone number
    const userType = event.target.userType.value; //value of user type
    const img = imgPlaceholder; //image placeholder until user adds his own

    const signupObject = {
      username: username,
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
      phoneNumber: phoneNumber,
      userType: userType,
      img: img,
    }; //object that we pass to php and it's taken by php://input
    /**Here I'm using 8000 port because I'm working with that port to avoid conflict
     * between react and php, this URL will change when we upload the project to a server
     */
    const response = await fetch(
      "http://localhost:8000/Backend/auth/index.php?action=signup",
      {
        method: "POST",
        body: JSON.stringify(signupObject),
      }
    );

    const data = await response.json();

    event.target.username.value = "";
    event.target.email.value = "";
    event.target.password.value = "";
    event.target.passwordConfirm.value = "";
    event.target.phoneNumber.value = "";
    const stringData = JSON.stringify(data.error);
    document.getElementById("popup-label-signup").innerHTML =
      stringData.replaceAll('"', "");
    openSignupPopup();
  } //end of handleSignUp

  return (
    <section>
      <link rel="stylesheet" href="./src/index.css"></link>
      <div className="container">
        <form className="form" id="login" onSubmit={handleSignIn}>
          <h1 className="form__title">Login</h1>
          <div className="form__message form__message--error"></div>
          <div className="form__input-group">
            <input
              autoFocus
              type="text"
              name="useroremail"
              className="form__input"
              placeholder="Username or email"
              required
            />
            <div className="form__input-error-message"></div>
          </div>
          <div id="signinFinish" className="form__input-popup">
            <label
              className="form__input-popup-label"
              id="popup-label-signin"
            />
            <div
              className="form__input-popup--cancel"
              onClick={closeSigninPopup}
            ></div>
          </div>
          <div className="form__input-group">
            <input
              autoFocus
              type="password"
              name="password"
              className="form__input"
              placeholder="Password"
              required
            />
            <div className="form__input-error-message"></div>
          </div>
          <button className="form__button" type="submit">
            Continue
          </button>
          <p className="form__text">
            <a href="./" id="linkCreateAccount" className="form__link">
              Not a Hero yet? Sign up here
            </a>
          </p>
        </form>
        <form
          className="form form--hidden"
          id="createAccount"
          onSubmit={handleSignUp}
        >
          <h1 className="form__title">Create Account</h1>
          <div className="form__message form__message--error"></div>
          <div className="form__input-group">
            <input
              name="username"
              autoFocus
              type="text"
              className="form__input"
              placeholder="Username"
              required
            />
            <div className="form__input-error-message"></div>
          </div>
          <div className="form__input-group">
            <input
              name="email"
              autoFocus
              type="text"
              className="form__input"
              placeholder="Email Address"
              required
            />
            <div className="form__input-error-message"></div>
          </div>
          <div id="signupFinish" className="form__input-popup">
            <label
              className="form__input-popup-label"
              id="popup-label-signup"
            />
            <div
              className="form__input-popup--cancel"
              onClick={closeSignupPopup}
            ></div>
          </div>
          <div className="form__input-group">
            <input
              name="password"
              autoFocus
              type="password"
              className="form__input"
              placeholder="Password"
              required
            />
            <div className="form__input-error-message"></div>
          </div>
          <div className="form__input-group">
            <input
              id="passwordConfirm"
              autoFocus
              type="password"
              className="form__input"
              placeholder="Confirm Password"
              required
            />
            <div className="form__input-error-message"></div>
          </div>
          <div className="form__input-group">
            <input
              id="phoneNumber"
              autoFocus
              type="tel"
              className="form__input"
              placeholder="Phone Number"
              required
            />
            <div className="form__input-error-message"></div>
          </div>
          <div>
            <select className="form__dropdown" id="userType">
              <option value="b">Buyer</option>
              <option value="s">Seller</option>
              <option value="t">Both</option>
            </select>
          </div>
          <button className="form__button" type="submit">
            Continue
          </button>
          <p className="form__text">
            <a href="./" id="linkLogin" className="form__link">
              Already a Hero? Sign in
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login");
  const createAccountForm = document.querySelector("#createAccount");
  //Action to hide login form and show sign up form
  document
    .querySelector("#linkCreateAccount")
    .addEventListener("click", (e) => {
      e.preventDefault();
      loginForm.classList.add("form--hidden");
      createAccountForm.classList.remove("form--hidden");
    });
  //Action to hide sign up form and show login form
  document.querySelector("#linkLogin").addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.remove("form--hidden");
    createAccountForm.classList.add("form--hidden");
  });
});

function openSignupPopup() {
  document.getElementById("signupFinish").style.display = "block";
}

function closeSignupPopup() {
  document.getElementById("signupFinish").style.display = "none";
}

function openSigninPopup() {
  document.getElementById("signinFinish").style.display = "block";
}

function closeSigninPopup() {
  document.getElementById("signinFinish").style.display = "none";
}
