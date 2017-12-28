<?php
/**
 * Created by IntelliJ IDEA.
 * User: jhouser
 * Date: 12/6/2017
 * Time: 4:15 PM
 */

/*require_once '../config/DatabaseConfig.php';
require_once '../services/AuthenticationService.php';*/

require_once dirname(__FILE__) . '/../config/DatabaseConfig.php';
require_once dirname(__FILE__) . '/../services/TaskService.php';

$databaseConfig = new DatabaseConfig();
$conn = $databaseConfig->openConnection();

$taskService = new TaskService($conn);

echo('<h1>Schedule Task List</h1>');

/*
$dateCreated = date("Y-m-d");
//            var_dump($dateCreated);
$createTask->bindParam(':dateCreated', $dateCreated);

$dateCreated = new DateTime();
$dateCreated->setTimestamp(strtotime($row['dateCreated']));
$task->dateCreated = date_format($dateCreated,"m/d/Y")
*/

echo(date_format(new DateTime(),"m/d/Y"));

$result = $taskService->scheduleTaskList("1,2,3",date_format(new DateTime(),"m/d/Y"));

echo(json_encode($result) );
?>