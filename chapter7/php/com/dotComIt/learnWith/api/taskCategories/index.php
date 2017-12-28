<?php
/**
 * Created by IntelliJ IDEA.
 * User: jhouser
 * Date: 12/8/2017
 * Time: 11:43 AM
 * Service API to load the filtered tasks
 * expect GET request with these values:
 * completed
 * startDate
 * More to come in later chapters
 */
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");

require_once dirname(__FILE__) . '/../../config/DatabaseConfig.php';
require_once dirname(__FILE__) . '/../../services/TaskService.php';

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'GET':
        $databaseConfig = new DatabaseConfig();
        $conn = $databaseConfig->openConnection();

        $taskService = new TaskService($conn);

        $result = $taskService->getTaskCategories();

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