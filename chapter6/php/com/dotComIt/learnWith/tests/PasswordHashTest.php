<?php
/**
 * Created by IntelliJ IDEA.
 * User: jhouser
 * Date: 12/6/2017
 * Time: 1:12 PM
 */

include_once '../config/DatabaseConfig.php';
include_once '../services/AuthenticationService.php';

$databaseConfig = new DatabaseConfig();
$conn = $databaseConfig->openConnection();

$authenticationService = new AuthenticationService($conn);

echo('<h1>Test Hash Password Me</h1>');
echo($authenticationService->hashPassword('me'));
echo('<br/>');
echo('<br/>');
echo('<h1>Test Hash Password Wife</h1>');
echo($authenticationService->hashPassword('wife'));
echo('<br/>');
echo('<br/>');

// $databaseConfig->closeConnection();
?>