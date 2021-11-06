<?php
    class DatabaseConfig
    {
        private $host = "localhost";
        private $port = "1433";
        private $db_name = "LearnWithApp";
        private $username = "LearnWithUser";
        private $password = "password";

        public $conn;

        public function openConnection(){
            if($this->conn){
                return $this->conn;
            };

            $serverName = "tcp:$this->host,$this->port";
            $connectionString = "sqlsrv:server=$serverName; Database=$this->db_name";
            try{
                $this->conn = new PDO( $connectionString, $this->username, $this->password);
                if($this->conn == false){
                    die(FormatErrors(sqlsrv_errors()));
                }
            }catch(Exception $exception){
                echo "Connection error: " . $exception->getMessage();
            }

            return $this->conn;

        }

        public function closeConnection(){
            $this->conn = null;
        }


    }

?>