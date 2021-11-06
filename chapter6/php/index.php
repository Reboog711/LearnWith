<html>
 <head>
  <title>PHP Test</title>
 </head>
 <body>
<?php
    // Show all information, defaults to INFO_ALL
//    echo gmdate('d.m.Y H:i', strtotime('2012-06-28 23:55'));
//    phpinfo();


$datetime = '08/22/2015 10:56 PM';
$tz_from = 'America/New_York';
$tz_to = 'UTC';
$format = 'Y-m-d\TH:i:s:u\Z';

$dt = new DateTime($datetime, new DateTimeZone($tz_from));
$dt->setTimeZone(new DateTimeZone($tz_to));
echo $dt->format($format) . "\n";

?>

 </body>
</html>