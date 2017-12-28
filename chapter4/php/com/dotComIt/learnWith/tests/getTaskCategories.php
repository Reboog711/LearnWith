<?php
/**
 * Created by IntelliJ IDEA.
 * User: jhouser
 * Date: 12/6/2017
 * Time: 4:15 PM
 */

require_once dirname(__FILE__) . '/../config/DatabaseConfig.php';
require_once dirname(__FILE__) . '/../services/TaskService.php';

$databaseConfig = new DatabaseConfig();
$conn = $databaseConfig->openConnection();

$taskService = new TaskService($conn);

echo('<h1>Get Task Categories</h1>');
$result = $taskService->getTaskCategories();
echo(json_encode($result) );
?>