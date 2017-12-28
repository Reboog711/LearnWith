<?php
/**
 * Created by IntelliJ IDEA.
 * User: jhouser
 * Date: 12/7/2017
 * Time: 9:43 PM
 */


require_once dirname(__FILE__) . '/../config/DatabaseConfig.php';
require_once dirname(__FILE__) . '/../services/TaskService.php';
require_once dirname(__FILE__) . '/../vos/TaskFilterVO.php';

$databaseConfig = new DatabaseConfig();
$conn = $databaseConfig->openConnection();
$taskService = new TaskService($conn);

echo('<h1>Get Not Completed Tasks</h1>');
$taskFilter = new TaskFilterVO();
$taskFilter->completed = 0;
$result = $taskService->getFilteredTasks($taskFilter);
echo(json_encode($result) );
echo('<br/>');echo('<br/>');

echo('<h1>Get Completed Tasks</h1>');
$taskFilter = new TaskFilterVO();
$taskFilter->completed = 1;
$result = $taskService->getFilteredTasks($taskFilter);
echo(json_encode($result) );
echo('<br/>');
echo('<br/>');

echo('<h1>Get Tasks After Date</h1>');
$taskFilter = new TaskFilterVO();
$taskFilter->startDate = "3/29/2017";
$result = $taskService->getFilteredTasks($taskFilter);
echo(json_encode($result) );
echo('<br/>');
echo('<br/>');

echo('<h1>Get Tasks After Date and Completed</h1>');
$taskFilter = new TaskFilterVO();
$taskFilter->completed = 1;
$taskFilter->startDate = "3/29/2017";
$result = $taskService->getFilteredTasks($taskFilter);
echo(json_encode($result) );
echo('<br/>');
echo('<br/>');

?>