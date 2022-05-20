<?php
    /** This PHP file is for connection*/
    /** Using PDO instead of MySQLi to use procedures OUT variables */
    //TERMINAL : php -S localhost:8000
    require 'config.php';
    class db {

        //Variables
            protected $con;
            protected $isConnected;
        //Variables

        /**Provisional constructor, will change after uploading the project to server */
        public function __construct($dbhost, $dbuser, $dbpass, $dbname){
            $this->con = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
            if ($this->con->connect_error) {
                $this->isConnected = false;
                error_log('Failed to connect to MySQL - '.$this->con->connect_error);
            } else {
                $this->isConnected = true;
            }//end if-else
        }//end of the constructor

        public function Close() {
            if($this->con->close()){
                $this->isConnected = false;
                return true;
            } else {
                error_log("Connection already close");
                return false;
            }//end if-else
        }//end of close function

        public function Query($query, $returnAsJSON = false){
            if(!$this->isConnected) {
                error_log("No connection established");
                return false;
            }//end of if

            $result = $this->con->query($query);

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
                    error_log("Invalid SQL Query");
                    return false;
                }//end if-else
            }//end if-else returnAsJSON
        }//end of query function
    }//end of the class db
?>