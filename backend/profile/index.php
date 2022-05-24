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
        $sql = "CALL updateUserInfo('$userId','$username', '$userType', '$img', '$phoneNumber', '$email', null)";
        $querySuccess = $db->Query($sql, false);
        if ($querySuccess == 1){
            $response['editSuccess'] = TRUE;
            $response['error'] = "User edited successfully.";
            echo json_encode($response);
        } else {
            $response['editSuccess'] = FALSE;
            $response['error'] = "User edit failed.";
            echo json_encode($response);
        }
    }
    /**POST METHOD */
?>