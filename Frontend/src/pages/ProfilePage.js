import React, { useState } from "react";
import imgPlaceholder from "../assets/img/user-placeholder.jpg";
import { useNavigate, Link } from "react-router-dom";

export default function ProfilePage({ setAuth }) {
  const [user] = useState(JSON.parse(localStorage.getItem("authUser")));
  const navigate = useNavigate();

  async function saveUser(event) {
    if (window.confirm("Please confirm save and logout")) {
      var fReader = new FileReader();
      event.preventDefault();
      const username = event.target.username.value; //value of username
      const email = event.target.useremail.value; //value of username
      const phoneNumber = event.target.userphone.value;
      const userType = event.target.usertype.value;
      const userId = user.u_id;
      const userPassword = user.u_pass;
      //If a file was uploaded go through the file upload flow
      if (event.target.userimage.files[0] != null) {
        var img = event.target.userimage.files[0];
        fReader.readAsDataURL(event.target.userimage.files[0]);

        fReader.onloadend = function (event) {
          var imgInput = document.getElementById("userImagePreview");
          imgInput.src = event.target.result;
        };

        var imgInput = document.getElementById("userImagePreview");

        img = imgInput.src;
        //If no file was uploaded, use the image from the database
      } else {
        img = user.u_img;
      }

      const editUserObject = {
        userId: userId,
        username: username,
        email: email,
        phoneNumber: phoneNumber,
        userType: userType,
        img: img,
        password: userPassword,
      }; //object that we pass to php and it's taken by php://input

      const response = await fetch(
        "http://localhost:8000/backend/profile/index.php",
        {
          method: "POST",
          body: JSON.stringify(editUserObject),
        }
      );

      const data = await response.json();

      //resets the authuser so that it fetches the updated data from the save
      localStorage.setItem("authUser", JSON.stringify(data.user));

      handleSignOut();
    }
  }

  //Signs the current user out
  function handleSignOut() {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("authUser");
    navigate("/");
  }

  //Process the file
  function loadFile(event) {
    var image = document.getElementById("userImagePreview");
    image.src = URL.createObjectURL(event.target.files[0]);
  }

  return (
    <section onLoad={loading}>
      <link rel="stylesheet" href="./src/index.css"></link>
      <form className="form" onSubmit={saveUser}>
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
          name="userphone"
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
          <input
            name="userimage"
            id="userImage"
            type="file"
            accept="image/*"
            onChange={loadFile}
          />
          <img
            className="form__image"
            id="userImagePreview"
            src={user.u_img || imgPlaceholder}
            alt="Choose"
            onError={(event) => (event.target.src = imgPlaceholder)}
          />
        </div>
        <button className="form__button" type="submit">
          Save User{" "}
        </button>
        <button className="form__button" onClick={handleSignOut}>
          Sign Out
        </button>
        <Link to="/home">
          <button className="form__button" type="button">
            Home
          </button>
        </Link>
      </form>
    </section>
  );

  //Load the values for the fields
  function loading() {
    document.getElementById("userName").value = user.u_name;
    document.getElementById("userEmail").value = user.u_email;
    document.getElementById("userPhone").value = user.u_phone;
    let element = document.getElementById("userType");
    element.value = user.u_type;
  }
}
