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

        
            if ($action == "login"){
                //Take the login object from the body response in HandleInfoPage
                $loginObject = json_decode(file_get_contents('php://input'));
                //After that now we can take the info
                $useroremail = $loginObject->useroremail;
                $password = $loginObject->password;

                //Check if we have a user or an email, we have to use === , https://www.php.net/manual/es/function.strpos.php
                if(strpos($useroremail, "@") == false){
                    $chkUser = $db->Query("CALL userExists('$useroremail', true, @isThere)", false)->fetch_object()->isThere;
                    if($chkUser == 0){
                        $response['authenticated'] = FALSE;
                        $response['error'] = "User name doesn't exist in our database.";
                        echo json_encode($response);
                    }else{
                        $db = new db(true);
                        $user = $db->Query("SELECT * FROM `full_user_info` WHERE `u_name`='$useroremail'", false)->fetch_object();
                        CheckPass($password, $user);
                    }//end of if-else object user
                }else{
                    $db = new db(true);
                    $chkEmail = $db->Query("CALL checkEmail('$useroremail', true, @emailExists)", false)->fetch_object()->emailExists;
                    if($chkEmail == 0){

                        $response['authenticated'] = FALSE;
                        $response['error'] = "Email doesn't exist in our database.";
                        echo json_encode($response);
                    }else{

                        $db = new db(true);
                        $user = $db->Query("SELECT * FROM full_user_info WHERE u_email = '$useroremail'", false)->fetch_object();
                        CheckPass($password, $user);
                    }//end of if-else object email
                }//end of if-else useroremail
            }//end of if action login

            /**Check if the password it's correct, if it is , it will send
             * the info , if not , it will send an error
             */
            function CheckPass($pass, $usr){
                if(password_verify($pass, $usr->u_pass)) {

                    $response['authenticated'] = TRUE;
                    $response['user'] = $usr;
                    echo json_encode($response);
                }else{
                    
                    $response['authenticated'] = FALSE;
                    $db = new db(true);
                    $response['error'] = "Incorrect password.";
                    echo json_encode($response);
                }//end if-else password 
            }//end of the function
        /**Login */

        /**Signup */
            if ($action == "signup"){
                //Take the new user object from the body response in HandleInfoPage
                $newUser = json_decode(file_get_contents('php://input'));
                //After that now we can take the info
                $username = $newUser->username;
                $email = $newUser->email;
                $password = $newUser->password;
                $passwordConfirm = $newUser->passwordConfirm;
                $phoneNumber = $newUser->phoneNumber;
                $userType = $newUser->userType;
                $img = $newUser->img;
                //Validation of all fields and rules, phone number must be only numbers
                if(!preg_match('/^[0-9]+$/', $phoneNumber)) {
                    $response['signupSuccess'] = FALSE;
                    $response['error'] = "Phone number has invalid characters.";
                    echo json_encode($response); 
                //Password and username must be bigger than 5 characters and smaller than 20
                } else if (strlen($password) < 5 || strlen($password) > 20 || strlen($username) < 5 || strlen($username) > 20){
                    $response['signupSuccess'] = FALSE;
                    $response['error'] = "Password/Username must be between 5 and 20 characters.";
                    echo json_encode($response); 
                //Email must match the conditions of the filter
                } else if (!filter_var($email, FILTER_VALIDATE_EMAIL)){
                    $response['signupSuccess'] = FALSE;
                    $response['error'] = "Wrong email format.";
                    echo json_encode($response); 
                } else {
                    //Check if all fields are filled
                    if (!empty($username) && !empty($email) && !empty($password) && !empty($passwordConfirm) && !empty($phoneNumber) && !empty($userType)) {
                        // Check if passwords are the same
                        if ($password == $passwordConfirm) {
                            // If the user does not exist, then create a new user
                            $passEncrypt = password_hash($password, PASSWORD_DEFAULT);
                            $db = new db(true);

                            $sql = "CALL createUser('$username', '$userType', '$img', '$phoneNumber', '$email', '$passEncrypt', @result)";
                            $querySuccess = $db->Query($sql, false);
                            if ($querySuccess == 1){
                                if ($querySuccess->fetch_object()->result == 1) {
                                    $response['signupSuccess'] = TRUE;
                                    $response['error'] = "Signup successful.";
                                    echo json_encode($response); 
                                    } else {
                                        $response['signupSuccess'] = FALSE;
                                        $response['error'] = "Email/user already exists.";
                                        echo json_encode($response); 
                                    }
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

                }
            }//end of if action signup
        /**Signup */

    /**POST METHOD */
?>