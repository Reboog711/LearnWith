<?php
require_once  dirname(__FILE__) . '/../vos/UserVO.php';

class UserService{
    private $conn;
    function __construct($conn) {
        $this->conn = $conn;
    }
    function authenticate($username,$password){
        try{
            // the rest of our code goes here
            $query = "SELECT * FROM users where username = :username and password = :password";
            $getUser = $this->conn->prepare($query);
            $getUser->bindParam(':username', $username);
            $getUser->bindParam(':password', $password);
            $getUser->execute();
            $records = $getUser->fetchAll();
            $userCount = sizeof($records);

            if($userCount === 1){
                $row = $records[0];
                $user = new UserVO();
                $user->roleID = (int)$row['roleID'];
                $user->username = $row['userName'];
                $user->userID = (int)$row['userID'];
                return $user;
            } else {
                return null;
            }

        }
        catch(Exception $e){
            echo("Error!");
        }

    }

    function hashPassword($password){
        return hash('md5', $password);
    }


}

?>