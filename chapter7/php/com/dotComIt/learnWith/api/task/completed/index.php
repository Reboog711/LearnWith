<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");

require_once dirname(__FILE__) . '/../../../config/DatabaseConfig.php';
require_once dirname(__FILE__) . '/../../../services/TaskService.php';
require_once dirname(__FILE__) . '/../../../vos/RestExceptionVO.php';

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'PUT':
        // complete task
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $uri = explode( '/', $uri );
/*        echo(json_encode($uri));*/
        $completed = (string) $uri[count($uri)-2];
        $taskID = (int) $uri[count($uri)-4];
/*        echo('completed');
        echo($completed);
        echo('taskID');
        echo($taskID);*/

        $databaseConfig = new DatabaseConfig();
        $conn = $databaseConfig->openConnection();
        $taskService = new TaskService($conn);

        $result = $taskService->completeTask($taskID, $completed);
        if (is_null($result)) {
            $r = new RestExceptionVO();
            $r->message = "Task Not Found";
            http_response_code(404 );
            echo(json_encode($r) );
        }
        else if (is_a($result, 'Exception')) {
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
