<?php
/**
 * Created by IntelliJ IDEA.
 * User: jhouser
 * Date: 12/7/2017
 * Service API for allowing a user to login
 * expected POST input is a JSON packet:
 * {
 *  "username" : "some username",
 *  "password" : "hashedPassword"
 * }
 */

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

require_once dirname(__FILE__) . '/../../config/DatabaseConfig.php';
require_once dirname(__FILE__) . '/../../services/AuthenticationService.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'POST':
        // get the POSTED input
        $data = json_decode(file_get_contents("php://input"));

        $databaseConfig = new DatabaseConfig();
        $conn = $databaseConfig->openConnection();
        $authenticationService = new AuthenticationService($conn);

        $result = $authenticationService->authenticate($data->username,$data->password);

        echo(json_encode($result) );

        break;
    default:
        $r = new ResultObjectVO();
        $r->error = true;
        $r->resultObject = "Unknown Request Type";
        echo(json_encode($r) );
        break;
}

?>