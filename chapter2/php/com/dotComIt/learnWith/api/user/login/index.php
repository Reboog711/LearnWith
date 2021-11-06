<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

require_once dirname(__FILE__) . '/../../../config/DatabaseConfig.php';
require_once dirname(__FILE__) . '/../../../services/UserService.php';
require_once dirname(__FILE__) . '/../../../vos/RestExceptionVO.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        $databaseConfig = new DatabaseConfig();
        $conn = $databaseConfig->openConnection();
        $userService = new UserService($conn);
        $result = $userService->authenticate($data->username,$data->password);

        if($result){
            http_response_code(200);
            echo(json_encode($result));
        } else {
            $r = new RestExceptionVO();
            $r->message = "User Not Authorized";
            http_response_code(401);
            echo(json_encode($r) );
        }


        break;
    default:
        $r = new RestExceptionVO();
        $r->message = "Unknown Request Type";
        $r->message = $method;

        http_response_code(404);
        echo(json_encode($r) );
        break;
}

?>