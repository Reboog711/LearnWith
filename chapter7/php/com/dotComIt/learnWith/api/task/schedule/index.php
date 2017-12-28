<?php
/**
 * Created by IntelliJ IDEA.
 * User: jhouser
 * Date: 12/9/2017
 * Time: 10:34 AM
 */

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");

require_once dirname(__FILE__) . '/../../../vos/ResultObjectVO.php';
require_once dirname(__FILE__) . '/../../../config/DatabaseConfig.php';
require_once dirname(__FILE__) . '/../../../services/TaskService.php';

$databaseConfig = new DatabaseConfig();
$conn = $databaseConfig->openConnection();

$taskService = new TaskService($conn);

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'PUT':
        // update task
        $data = json_decode(file_get_contents('php://input'));
        if(isset($data->taskID)){
            if(!isset($data->dateScheduled)){
                $data->dateScheduled = null;
            }
            $result = $taskService->scheduleTask($data->taskID,$data->dateScheduled);
        } else {
/*            echo('schedule task list');
            echo($data->dateScheduled);
            echo($data->taskIDList);*/
            $result = $taskService->scheduleTaskList($data->taskIDList,$data->dateScheduled);
        }
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