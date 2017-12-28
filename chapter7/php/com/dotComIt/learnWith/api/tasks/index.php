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
        if(isset($_GET["taskID"])){
            $taskFilter->taskID = $_GET["taskID"];
        }
        if(isset($_GET["taskCategoryID"])) {
            $taskFilter->taskCategoryID = $_GET["taskCategoryID"];
        }
        if(isset($_GET["startDate"])) {
            $taskFilter->startDate = $_GET["startDate"];
        }
        if(isset($_GET["endDate"])) {
            $taskFilter->endDate = $_GET["endDate"];
        }
        if(isset($_GET["scheduledStartDate"])) {
            $taskFilter->scheduledStartDate = $_GET["scheduledStartDate"];
        }
        if(isset($_GET["scheduledEndDate"])) {
            $taskFilter->scheduledEndDate = $_GET["scheduledEndDate"];
        }
        if(isset($_GET["scheduledEqualDate"])) {
            $taskFilter->scheduledEqualDate = $_GET["scheduledEqualDate"];
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