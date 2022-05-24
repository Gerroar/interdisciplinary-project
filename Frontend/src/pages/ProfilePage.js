import React, { useState } from "react";
import imgPlaceholder from "../assets/img/user-placeholder.jpg";
import { useNavigate, Link } from "react-router-dom";

export default function ProfilePage({ setAuth }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );
  const navigate = useNavigate();

  async function saveUser(event) {
    event.preventDefault();
    console.log(event.target.username);
    const username = event.target.username.value; //value of username
    const email = event.target.email.value; //value of username
    const phoneNumber = event.target.phoneNumber.value;
    const userType = event.target.userType.value;
    const img = imgPlaceholder;
    const userId = user.u_id;
    const userPassword = user.u_pass;

    const editUserObject = {
      userId: userId,
      username: username,
      email: email,
      phoneNumber: phoneNumber,
      userType: userType,
      img: img,
      password: userPassword,
    }; //object that we pass to php and it's taken by php://input

    /**Here I'm using 8000 port because I'm working with that port to avoid conflict
     * between react and php, this URL will change when we upload the project to a server
     */
    const response = await fetch(
      "http://localhost:8000/Backend/auth/index.php?action=signup",
      {
        method: "POST",
        body: JSON.stringify(editUserObject),
      }
    );

    const data = await response.json();
  }

  function handleSignOut() {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("authUser");
    navigate("/");
  }

  /**
   * handleImageChange is called every time the user chooses an image in the fire system.
   * The event is fired by the input file field in the form
   */
  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file.size < 500000) {
      // image file size must be below 0,5MB
      const reader = new FileReader();
      reader.onload = (event) => {
        setUser((prevUser) => ({ ...prevUser, image: event.target.result }));
      };
      reader.readAsDataURL(file);
      setErrorMessage(""); // reset errorMessage state
    } else {
      // if not below 0.5MB display an error message using the errorMessage state
      setErrorMessage("The image file is too big!");
    }
  }

  return (
    <section onLoad={loading}>
      <link rel="stylesheet" href="./src/index.css"></link>
      <div className="container">
        User Name
        <input
          type="text"
          className="form__input"
          name="username"
          id="userName"
          autoFocus
          required
        />
        <div className="form__input-error-message"></div>
        Email
        <input
          type="text"
          className="form__input"
          name="useremail"
          id="userEmail"
          autoFocus
          required
        />
        <div className="form__input-error-message"></div>
        Phone:
        <input
          type="tel"
          className="form__input"
          name="userPhone"
          id="userPhone"
          autoFocus
          required
        />
        Type:
        <select className="form__dropdown" name="usertype" id="userType">
          <option value="b">Buyer</option>
          <option value="s">Seller</option>
          <option value="t">Both</option>
        </select>
        Image
        <div className="form__input">
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <img
            src={user.image || imgPlaceholder}
            alt="Choose"
            onError={(event) => (event.target.src = imgPlaceholder)}
          />
        </div>
        <p className="text-error">{errorMessage}</p>
        <button onClick={saveUser}>Save User </button>
        <button className="btn-outline" onClick={handleSignOut}>
          Sign Out
        </button>
        <Link to="/home">
          <button type="button">Home</button>
        </Link>
      </div>
    </section>
  );

  function loading() {
    document.getElementById("userName").value = user.u_name;
    document.getElementById("userEmail").value = user.u_email;
    document.getElementById("userPhone").value = user.u_phone;
    let element = document.getElementById("userType");
    element.value = user.u_type;
  }
}
