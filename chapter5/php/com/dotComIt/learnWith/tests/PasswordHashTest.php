<?php
include_once '../config/DatabaseConfig.php';
include_once '../services/UserService.php';
$databaseConfig = new DatabaseConfig();
$conn = $databaseConfig->openConnection();
$userService = new UserService($conn);
echo('<h1>Test Hash Password Me</h1>');
echo($userService->hashPassword('me'));
echo('<br/>');echo('<br/>');

echo('<h1>Test Hash Password You</h1>');
echo($userService->hashPassword('you'));
echo('<br/>');echo('<br/>');
?>
