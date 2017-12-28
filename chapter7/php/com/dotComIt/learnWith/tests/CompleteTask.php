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

echo('<h1>Complete Task</h1>');
$result = $taskService->completeTask(1,1);
echo(json_encode($result) );

echo('<h1>Not Complete Task</h1>');
$result = $taskService->completeTask(1,0);
echo(json_encode($result) );

?>