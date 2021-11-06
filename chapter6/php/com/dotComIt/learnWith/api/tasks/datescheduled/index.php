<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");

require_once dirname(__FILE__) . '/../../../config/DatabaseConfig.php';
require_once dirname(__FILE__) . '/../../../services/TasksService.php';

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'PUT':
        // update task
        $data = json_decode(file_get_contents('php://input'));
        if(!isset($data->dateScheduledAsUTCString)){
            $data->dateScheduledAsUTCString = null;
        }

        $databaseConfig = new DatabaseConfig();
        $conn = $databaseConfig->openConnection();
        $tasksService = new TasksService($conn);
        $result = $tasksService->scheduleTaskList($data->taskIDList,$data->dateScheduledAsUTCString);

        if (is_a($result, 'Exception')) {
            $r = new RestExceptionVO();
            $r->message = $result.getMessage();
            http_response_code(500 );
            echo(json_encode($result) );

        } else {
            http_response_code(200);
            echo(json_encode($result) );
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