<?php
/**
 * Created by IntelliJ IDEA.
 * User: jhouser
 * Date: 12/6/2017
 * Time: 11:59 AM
 */

require_once  dirname(__FILE__) . '/../vos/ResultObjectVO.php';
require_once  dirname(__FILE__) . '/../vos/UserVO.php';

class AuthenticationService{

    private $conn;

    function __construct($conn) {
        $this->conn = $conn;
    }


    function authenticate($username,$password)
    {
        try
        {
            // for non PDO queries
//            $tsql = "SELECT * FROM users where username = " . $username . " and password = " . $password;
//            $getUser = sqlsrv_query($this->conn, $tsql);
            // for PDO queries
            $query = "SELECT * FROM users where username = :username and password = :password";
            $getUser = $this->conn->prepare($query);
            $getUser->bindParam(':username', $username);
            $getUser->bindParam(':password', $password);
            $getUser->execute();
//            $getUser->debugDumpParams();
//            echo('<br /><br />');

            $records = $getUser->fetchAll();
            $userCount = sizeof($records);
            $result = new ResultObjectVO();

            /*            foreach ($getUser as $row) {
                            echo "UserID:" . $row['userID'] . "\n";
                        }*/

            if($userCount === 1){
                $result->error = false;
                $row = $records[0];

                $user = new UserVO();
                $user->roleID = (int)$row['roleID'];
                $user->username = $row['userName'];
                $user->userID = (int)$row['userID'];
                $result->resultObject = $user;

            } else {
                $result->error = true;
            }
            return $result;
        }
        catch(Exception $e)
        {
            echo("Error!");
        }
    }

    function hashPassword($password){
        return hash('md5', $password);
    }
}

?>