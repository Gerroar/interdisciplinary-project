<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");
    header("Content-Type: application/json; charset=UTF-8");
    include_once("../classes/db.php");

    $db = new db(true);
    $request_method = $_SERVER['REQUEST_METHOD'];
    $jsonResponse = [];

    if ($request_method === 'GET') {
         if(isset($_GET['id'])) {
            $postId = $_GET['id'];
            $sql = "SELECT * FROM posts WHERE id = '$postId'";
            $jsonResponse = $db->Query($sql, true);
         } else {
            $sql = "SELECT * FROM posts ORDER BY created_at DESC";
            $jsonResponse = $db->Query($sql, true);
         }
    }

    if($request_method === 'POST') {
        $newPost = json_decode(file_get_contents('php://input'));
        if($newPost){
            $sql = "CALL createPost()";
            if($db->Query($sql, false)){
                $jsonResponse['status'] = "success";
            }  else{
                $jsonResponse['status'] = "failed";
                $jsonResponse['errorCode'] = "Missing parameters";
            }

        } else{
            $jsonResponse['status'] = "failed";
            $jsonResponse['errorCode'] = "Missing parameters";
        }

        $jsonResponse = json_encode($jsonResponse);
    }
    
    if($request_method === 'PUT') {
        if(isset($_GET['id'])) {
            $postId = $_GET['id'];
            $post = json_decode(file_get_contents('php://input'));
            $sql = "UPDATE posts 
                    SET title = '$post->title', body = '$post->body', image = '$post->image'
                    WHERE id = '$postId'";
            $response = $db->Query($sql, false);

            if($response) {
                $jsonResponse['status'] = "success";
            } else {
                $jsonResponse['status'] = "failed";
                $jsonResponse['errorCode'] = "Bad connection to db server";
            }
        } else {
            $jsonResponse['status'] = "failed";
            $jsonResponse['errorCode'] = "Missing id parameter";
        }
        $jsonResponse = json_encode($jsonResponse);
    }

    if($request_method === 'DELETE' && isset($_GET['id'])) {
        $postId = $_GET['id'];
        $sql = "DELETE FROM POSTS WHERE id = '$postId'";

        if($db->Query($sql, false)){
            $jsonResponse['status'] = "success";
        } else {
            $jsonResponse['status'] = "failed";
            $jsonResponse['errorCode'] = "Missing id parameter";
        }

        $jsonResponse = json_encode($jsonResponse);
    }

    echo $jsonResponse;


?>