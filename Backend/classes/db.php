<?php
    /** This PHP file is for connection*/
    //TERMINAL : php -S localhost:8000
    //require 'config.php';

    set_error_handler(function() { });
    class db {

        //Variables
            public $error = null;
            private $dbhost = "localhost";
            private $dbuser = "root";
            private $dbname = "inter_project";
            private $dbpassword = "1234";

            public $mySQL;
            private $isConnected = false;         
        //Variables

        public function __construct($autoConnect = false){
            $this->SetDatabase($this->dbname);
            $this->SetServer($this->dbhost, $this->dbuser, $this->dbpassword);

            if($autoConnect){
                return $this->Connect();
            }//end of if
        }//end of the constructor

        public function SetDatabase($dbname){
            $this->dbname = $dbname;
        }

        public function SetServer($dbhost, $dbuser, $dbpassword){
            $this->dbhost = $dbhost;
            $this->dbuser = $dbuser;
            $this->dbpassword = $dbpassword;
        }

        public function Connect(){
            $this->mySQL = new mysqli($this->dbhost, $this->dbuser, $this->dbpassword, $this->dbname);

            if(empty($this->mySQL->connect_error)){
                $this->isConnected = true;
                return true;
            }else{
                $this->error = $this->mySQL->connect_error;
                return false;
            }//end of the if-else
        }

        public function Close() {
            if(!empty($this->mySQL)){
                if($this->mySQL->close()){
                    $this->isConnected = false;
                    return true;
                } else {
                    $this->error = "Couldn't disconnect";
                    return false;
                }//end if-else close
            }else{
                $this->error = "No established connection. Couldn't disconnect";
                return false;
            }//end if-else empty
        }//end of close function

        public function Query($query, $returnAsJSON = false){
            if(!$this->isConnected) {
                $this->error = "No connection established";
                return false;
            }//end of if
            
            $result = $this->mySQL->query($query);

            if($returnAsJSON) {

                $json = [];
                $json["status"] = $result ? "success" : "failed";
                $json["errorCode"] = $result ? "" : "Wrong Query";

                if($result) {
                    $data = [];
                    while($row = $result->fetch_assoc()){
                        $data[] = $row;
                    }//end of while

                    $json["data"] = $data;
                }//end if result
                return json_encode($json);
            }else{
                if($result){

                    return $result;
                }else{

                    $this->error = "Invalid SQL Query";
                    return false;
                }//end if-else
            }//end if-else returnAsJSON
        }//end of query function
    }//end of the class db
?>