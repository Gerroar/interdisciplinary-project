<?php
    /** This PHP file is for connection*/
    class db {

        //Variables
            protected $con;
        //Variables

        public function __construct($dbhost, $dbuser, $dbpass, $dbname){
            $this->con = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
            if ($this->con->connect_error) {
                error_log('Failed to connect to MySQL - '.$this->con->connect_error);
            }//end if
        }//end of the constructor

        public function close() {
            return $this->con->close();
        }//end of close function
    }//end of the class db
?>