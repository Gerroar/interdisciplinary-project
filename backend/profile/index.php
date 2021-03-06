<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");
    header("Content-Type: application/json; charset=UTF-8");
    include_once("../classes/db.php");
    $db = new db(true);

    //Take the new user object from the body response in HandleInfoPage
    $editUser = json_decode(file_get_contents('php://input'));
    //After that now we can take the info
    $userId = $editUser->userId;
    $username = $editUser->username;
    $email = $editUser->email;
    $phoneNumber = $editUser->phoneNumber;
    $userType = $editUser->userType;
    $img = $editUser->img;
    $userPassword = $editUser->password;

    //Check that all fields are filled
    if (!empty($username) && !empty($email) && !empty($phoneNumber) && !empty($userType)) {
        //Query the database to update the info using the stored procedure
        $sql = "CALL updateUserInfo('$userId','$username', '$userType', '$img', '$phoneNumber', '$email', null)";
        $querySuccess = $db->Query($sql, false);
        //If query was successful send success message back, otherwise send error message back
        if ($querySuccess == 1){
            $db = new db(true);
            $user = $db->Query("SELECT * FROM `full_user_info` WHERE `u_name`='$username'", false)->fetch_object();
            $response['editSuccess'] = TRUE;
            $response['error'] = $img;
            $response['user'] = "User edited successfully.";
            echo json_encode($response);
        } else {
            $response['editSuccess'] = FALSE;
            $response['error'] = "User edit failed.";
            echo json_encode($response);
        }
    }
    /**POST METHOD */
?>