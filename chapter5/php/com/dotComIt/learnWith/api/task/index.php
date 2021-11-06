<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT");

require_once dirname(__FILE__) . '/../../config/DatabaseConfig.php';
require_once dirname(__FILE__) . '/../../services/TaskService.php';
require_once dirname(__FILE__) . '/../../vos/RestExceptionVO.php';

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'GET':
        // other code here
        $databaseConfig = new DatabaseConfig();
        $conn = $databaseConfig->openConnection();
        $taskService = new TaskService($conn);

        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $uri = explode( '/', $uri );
        $taskID = (int) $uri[count($uri)-1];

        $result = $taskService->loadTask($taskID);

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
    case 'PUT':
        // update task
        $data = json_decode(file_get_contents('php://input'));
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $uri = explode( '/', $uri );
        $taskID = (int) $uri[count($uri)-1];

        if (!property_exists($data, 'taskCategoryID') || !property_exists($data, 'description') ) {
            $r = new RestExceptionVO();
            $r->message = "Missing Properties";
            http_response_code(500 );
            echo(json_encode($r) );
            exit();
        }

        $databaseConfig = new DatabaseConfig();
        $conn = $databaseConfig->openConnection();
        $taskService = new TaskService($conn);
        $result = $taskService->updateTask($taskID,$data->taskCategoryID, $data->description);

        if (is_a($result, 'Exception')) {
            $r = new RestExceptionVO();
            $r->message = $result.getMessage();
            http_response_code(500 );
            echo(json_encode($r) );
        } else {
            http_response_code(200);
            echo(json_encode($result) );
        }

        break;
    case 'POST':
        // create new task
        $data = json_decode(file_get_contents("php://input"));

        if (!property_exists($data, 'taskCategoryID') || !property_exists($data, 'userID') ||  !property_exists($data, 'description') ) {
            $r = new RestExceptionVO();
            $r->message = "Missing Properties";
            http_response_code(500 );
            echo(json_encode($r) );
            exit();
        }

        $databaseConfig = new DatabaseConfig();
        $conn = $databaseConfig->openConnection();
        $taskService = new TaskService($conn);
        $result = $taskService->createTask($data->taskCategoryID,$data->userID, $data->description);

        if (is_a($result, 'Exception')) {
            $r = new RestExceptionVO();
            $r->message = $result.getMessage();
            http_response_code(500 );
            echo(json_encode($r) );
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