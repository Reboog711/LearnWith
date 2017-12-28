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
require_once dirname(__FILE__) . '/../../vos/TaskFilterVO.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $databaseConfig = new DatabaseConfig();
        $conn = $databaseConfig->openConnection();

        $taskService = new TaskService($conn);

        // Create TaskFilterVO using the URL Variables
        $taskFilter = new TaskFilterVO();
        if(isset($_GET["completed"])){
            $taskFilter->completed = $_GET["completed"];
        }
        if(isset($_GET["startDate"])) {
            $taskFilter->startDate = $_GET["startDate"];
        }
        $result = $taskService->getFilteredTasks($taskFilter);

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