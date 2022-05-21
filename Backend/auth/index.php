<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");
    header("Content-Type: application/json; charset=UTF-8");
    include_once("../classes/db.php");
    $db = new db(true);
    
    //We take the action from url created at the response/fetch moment
    $action = $_GET['action'];

    /**POST METHOD */

        /**Login */
            if ($action = "login"){
                //Take the login object from the body response in HandleInfoPage
                $loginObject = json_decode(file_get_contents('php://input'));
                //After that now we can take the info
                $useroremail = $loginObject->useroremail;
                $password = $loginObject->password;

                //Check if we have a user or an email, we have to use === , https://www.php.net/manual/es/function.strpos.php
                if(strpos($useroremail, "@") === false){
                    $chkUser = $db->Query("CALL userExists($useroremail, true, @isThere)", false);
                    $object = $chkUser->fetch_object();
                    if($object->isThere ==)
                }else{

                }//end of if-else useroremail
            }//end of if action login
        /**Login */

        /**Signup */
            if ($action = "signup"){
                //Take the signup object from the body response in HandleInfoPage
                $signupObject = json_decode(file_get_contents('php://input'));
                //After that now we can take the info
                $username = $signupObject->username;
                $email = $signupObject->email;
                $password = $signupObject->password;
                $passwordConfirm = $signupObject->passwordConfirm;

                if (!empty($email) && !empty($password)) {
                    // Check if passwords are the same
                    if ($password == $passwordConfirm) {

                        // Check if username already exists
                        $sql = "SELECT id FROM users WHERE mail = '$mail'";
                        $result = $mySQL->Query($sql, false);

                        // If the username does not exist, then create a new user
                        if ($result->num_rows == 0) {
                            $passEncrypt = password_hash($newUser->password, PASSWORD_DEFAULT);

                            $sql = "INSERT INTO users
                                    (mail, name, password)
                                    VALUES
                                        ('$newUser->mail', '$newUser->name', '$passEncrypt')
                                    ";
                            if ($mySQL->Query($sql, false) === TRUE) {
                                $sql = "SELECT id, image, title, mail, name, phone FROM users WHERE mail = '$mail'";
                                $user = $mySQL->Query($sql, false)->fetch_object();
                                $response['signupSuccess'] = TRUE;
                                $response['user'] = $user;
                                echo json_encode($response);
                            } else {
                                $response['signupSuccess'] = FALSE;
                                $response['error'] = "Signup failed. Please try again.";
                                echo json_encode($response);
                            }
                        } else {
                            $response['signupSuccess'] = FALSE;
                            $response['error'] = "Signup failed. Username taken.";
                            echo json_encode($response);
                        }
                    } else {
                        $response['signupSuccess'] = FALSE;
                        $response['error'] = "Signup failed. Passwords not the same.";
                        echo json_encode($response);
                    }
                } else {
                    $response['signupSuccess'] = FALSE;
                    $response['error'] = "Signup failed. Please fill out all fields.";
                    echo json_encode($response);
                }

            }//end of if action signup
        /**Signup */

    /**POST METHOD */
?>