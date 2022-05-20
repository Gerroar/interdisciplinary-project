<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");
    header("Content-Type: application/json; charset=UTF-8");
    include_once("../classes/db.php");
    $db = new db("localhost","root","7794CopErnico?","inter_project");
    
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
                    
                }
            }//end of if action login
        /**Login */

    /**POST METHOD */
?>