<?php
/**
 * Created by IntelliJ IDEA.
 * User: jhouser
 * Date: 12/6/2017
 */

class DatabaseConfig
{
    // specify your own database credentials
    private $host = "developer.dot-com-it.com";
    private $port = "2433";
    private $db_name = "LearnWithApp";
    private $username = "LearnWithUser";
    private $password = "password";

    public $conn;

    // get the database connection
    public function openConnection(){

        $this->conn = null;

        // for non PDO Connection:
        $serverName = "tcp:" . $this->host . "," . $this->port;
        $connectionOptions = array("Database"=>$this->db_name,"Uid"=>$this->username, "PWD"=>$this->password);

        // for PDO Connection:
//        $serverName = "tcp:$this->host,$this->port";
        $serverName = "tcp:$this->host,$this->port";
        $connectionString = "sqlsrv:server=$serverName; Database=$this->db_name";

        try{
//            $this->conn = sqlsrv_connect($serverName, $connectionOptions);
            $this->conn = new PDO( $connectionString, $this->username, $this->password);

            if($this->conn == false){
                die(FormatErrors(sqlsrv_errors()));
            }
        }catch(Exception $exception){
            echo "Connection error: " . $exception->getMessage();
        }

        return $this->conn;
    }

    // close the database connection
    public function closeConnection(){
        sqlsrv_close($this->conn);
    }


}
?>
