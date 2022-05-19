<?php
    /** This PHP file is for connection*/
    //TERMINAL : php -S localhost:8000
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

        public function close() {
            if($this->isConnected){
                return $this->con->close();
            } else {
                error_log("Connection already close");
            }//end if-else
        }//end of close function
    }//end of the class db
?>