import React, { useState } from "react";
import imgPlaceholder from "../assets/img/user-placeholder.jpg";
import { useNavigate, Link } from "react-router-dom";

export default function ProfilePage({ setAuth }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );
  const navigate = useNavigate();

  console.log(user);

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  }

  function handleSignOut() {
    setAuth(false);
    localStorage.removeItem("isAuth");
    localStorage.removeItem("authUser");
    navigate("/sign-in");
  }

  //document.getElementById("userName").innerHTML = user.name;

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
    <body className="page" onLoad={loading}>
      <label>
        User Name:
        <label id="userName" />
      </label>
      <label>
        Email:
        <label id="userEmail" />
      </label>
      <label>
        Phone:
        <label id="userPhone" />
      </label>
      <label>
        Type:
        <label id="userType" />
      </label>
      <label>
        Image
        <input
          type="file"
          className="file-input"
          accept="image/*"
          onChange={handleImageChange}
        />
        <img
          className="image-preview"
          src={user.image || imgPlaceholder}
          alt="Choose"
          onError={(event) => (event.target.src = imgPlaceholder)}
        />
      </label>
      <p className="text-error">{errorMessage}</p>
      <button>Save User</button>
      <button className="btn-outline" onClick={handleSignOut}>
        Sign Out
      </button>
      <Link to="/home">
        <button type="button">Home</button>
      </Link>
    </body>
  );

  function loading() {
    document.getElementById("userName").innerHTML = user.u_name;
    document.getElementById("userEmail").innerHTML = user.u_email;
    document.getElementById("userPhone").innerHTML = user.u_phone;
    document.getElementById("userType").innerHTML = user.u_type;
  }
}
