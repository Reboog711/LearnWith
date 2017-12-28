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
require_once dirname(__FILE__) . '/../services/AuthenticationService.php';



$databaseConfig = new DatabaseConfig();
$conn = $databaseConfig->openConnection();

$authenticationService = new AuthenticationService($conn);

echo('<h1>Test Authentication Success</h1>');
$result = $authenticationService->authenticate('me','AB86A1E1EF70DFF97959067B723C5C24');
//$result = $authenticationService->authenticate('me',hash('md5', 'me'));
echo(json_encode($result) );
echo('<br/>');
echo('<br/>');
echo('<h1>Test Authentication Fail</h1>');
$result = $authenticationService->authenticate('me','me');
echo(json_encode($result) );
echo('<br/>');
echo('<br/>');
?>