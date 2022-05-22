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
                    $response['error'] = "Wrong password";
                    echo json_encode($response);
                }//end if-else password 
            }//end of the function

            if ($action = "login"){
                //Take the login object from the body response in HandleInfoPage
                $loginObject = json_decode(file_get_contents('php://input'));
                //After that now we can take the info
                $useroremail = $loginObject->useroremail;
                $password = $loginObject->password;

                //Check if we have a user or an email, we have to use === , https://www.php.net/manual/es/function.strpos.php
                if(strpos($useroremail, "@") === false){
                    $chkUser = $db->Query("CALL userExists('$useroremail', true, @isThere)", false)->fetch_object();
                    if($chkUser->isThere == 0){
                        $response['authenticated'] = FALSE;
                        $response['error'] = "User name doesn't exist";
                        echo json_encode($response);
                    }else{
                        $user = $db->Query("SELECT * FROM full_user_info WHERE u_email='$useroremail'", false)->fetch_object();
                        CheckPass($password, $user);
                    }//end of if-else object user
                }else{

                    $chkEmail = $db->Query("CALL checkEmail($useroremail, true, @isThere)", false)->fetch_object();
                    if($chkUser->isThere == 0){

                        $response['authenticated'] = FALSE;
                        $response['error'] = "User email doesn't exist";
                        echo json_encode($response);
                    }else{

                        $user = $db->Query("SELECT * FROM full_user_info WHERE u_name = '$useroremail'", false)->fetch_object();
                        CheckPass($password, $user);
                    }//end of if-else object email
                }//end of if-else useroremail
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
                        if (!$object->isThere) {
                            $passEncrypt = password_hash($newUser->password, PASSWORD_DEFAULT);

                            $sql = "CALL createUser('$username', '$userType', null, '$phoneNumber', '$email', '$passEncrypt', @result)";
                            if ($mySQL->Query($sql, false) === TRUE) {
                                //$sql = "SELECT user_id, user_img, user_phone, user_email, user_pass FROM settings WHERE ";
                                $user = $mySQL->Query($sql, false)->fetch_object();
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