<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");

require_once dirname(__FILE__) . '/../../config/DatabaseConfig.php';
require_once dirname(__FILE__) . '/../../services/TasksService.php';
require_once dirname(__FILE__) . '/../../vos/TaskFilterVO.php';

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'GET':
        // other code here
        $databaseConfig = new DatabaseConfig();
        $conn = $databaseConfig->openConnection();
        $tasksService = new TasksService($conn);
        $taskFilter = new TaskFilterVO();
        if(isset($_GET["completed"])){
            $taskFilter->completed = $_GET["completed"];
        }
        if(isset($_GET["startDateAsUTCString"])) {
            $taskFilter->startDateAsUTCString = $_GET["startDateAsUTCString"];
        }
        $result = $tasksService->getFilteredTasks($taskFilter);

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