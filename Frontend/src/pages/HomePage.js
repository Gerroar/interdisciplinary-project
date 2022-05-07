export default function HomePage() {
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
              <input
                className="button"
                type="button"
                value="Login"
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
