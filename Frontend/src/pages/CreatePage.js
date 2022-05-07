export default function CreatePage() {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="css/style.css" />
        <script src="js/login.js"></script>
      </head>
      <body>
        <div class="container">
          <div class="main">
            <form id="form_id" method="post" name="myform">
              <label>User Name :</label>
              <input
                type="text"
                placeholder="Enter your username..."
                name="username"
                id="username"
              />
              <label>Password :</label>
              <input
                type="password"
                placeholder="Enter your password..."
                name="password"
                id="password"
              />
              <label>Verify Password :</label>
              <input
                type="password"
                placeholder="Enter your password again..."
                name="verifyPassword"
                id="verifyPassword"
              />
              <label>Email :</label>
              <input
                type="text"
                placeholder="Enter your email..."
                name="email"
                id="email"
              />
              <label>Phone number :</label>
              <input
                type="text"
                placeholder="Enter your phone number..."
                name="phoneNumber"
                id="phoneNumber"
              />
              <input
                type="button"
                value="Register"
                id="submit"
                onclick="validate()"
              />
            </form>
          </div>
        </div>
      </body>
    </html>
  );
}
