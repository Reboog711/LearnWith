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

echo('<h1>Schedule Task</h1>');
$result = $taskService->scheduleTask(1,date_format(new DateTime(),"m/d/Y"));
echo(json_encode($result) );

echo('<h1>Cancel Task</h1>');
$result = $taskService->scheduleTask(1, null );
echo(json_encode($result) );

?>