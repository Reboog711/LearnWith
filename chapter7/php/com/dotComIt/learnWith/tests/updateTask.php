<?php
/**
 * Created by IntelliJ IDEA.
 * User: jhouser
 * Date: 12/7/2017
 * Time: 9:43 PM
 */


require_once dirname(__FILE__) . '/../config/DatabaseConfig.php';
require_once dirname(__FILE__) . '/../services/TaskService.php';

$databaseConfig = new DatabaseConfig();
$conn = $databaseConfig->openConnection();

$taskService = new TaskService($conn);

echo('<h1>Update Task</h1>');
$result = $taskService->updateTask(1,2,'Get Milk 2');
echo(json_encode($result) );

?>