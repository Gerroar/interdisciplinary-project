<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");
    header("Content-Type: application/json; charset=UTF-8");
    include_once("../classes/db.php");
    $db = new db("localhost","root","1234","inter_project");
    
    //We take the action from url created at the response/fetch moment
    $action = $_GET['action'];

    /**POST METHOD */

        /**Login */
            if ($action = "login"){
                //Take the login object from the body response in HandleInfoPage
                $loginObject = json_decode(file_get_contents('php://input'));
                //After that now we can take the info
                //$useroremail = $loginObject->useroremail;
                $password = $loginObject->password;

                //Check if we have a user or an email, we have to use === , https://www.php.net/manual/es/function.strpos.php
                //if(strpos($useroremail, "@") === false){
                    
                //}
            }//end of if action login
        /**Login */

        /**Signup */
            if ($action = "signup"){
                //Take the new user object from the body response in HandleInfoPage
                $newUser = json_decode(file_get_contents('php://input'));
                //After that now we can take the info
                $username = $newUser->username;
                $email = $newUser->email;
                $password = $newUser->password;
                $passwordConfirm = $newUser->passwordConfirm;
                $phoneNumber = $newUser->phoneNumber;
                $userType = $newUser->userType;
                

                if (!empty($email) && !empty($password)) {
                    // Check if passwords are the same
                    if ($password == $passwordConfirm) {
                        // If the user does not exist, then create a new user
                            $passEncrypt = password_hash($newUser->password, PASSWORD_DEFAULT);

                            $sql = "CALL createUser('$username', '$userType', null, '$phoneNumber', '$email', '$passEncrypt', @result)";
                            if ($db->Query($sql, false) === TRUE) {
                                //$sql = "SELECT user_id, user_img, user_phone, user_email, user_pass FROM settings WHERE ";
                                $user = $db->Query($sql, false)->fetch_object();
                                $response['signupSuccess'] = TRUE;
                                $response['success'] = "Signup completed successfully.";
                                echo json_encode($response);
                            } else {
                                $response['signupSuccess'] = FALSE;
                                $response['error'] = "Signup failed. Please try again.";
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