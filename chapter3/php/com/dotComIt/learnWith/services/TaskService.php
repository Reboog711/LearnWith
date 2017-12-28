<?php
/**
 * Created by IntelliJ IDEA.
 * User: jhouser
 * Date: 12/6/2017
 * Time: 11:59 AM
 */

require_once  dirname(__FILE__) . '/../vos/ResultObjectVO.php';
require_once  dirname(__FILE__) . '/../vos/TaskFilterVO.php';
require_once  dirname(__FILE__) . '/../vos/TaskVO.php';

class TaskService{

    private $conn;
    function __construct($conn) {
        $this->conn = $conn;
    }

    function getFilteredTasks(TaskFilterVO $filter)
    {

        try
        {
            // for non PDO queries
//            $tsql = "SELECT * FROM users where username = " . $username . " and password = " . $password;
//            $getUser = sqlsrv_query($this->conn, $tsql);
            // for PDO queries
            $query = "select tasks.*, taskCategories.taskCategory from tasks join taskCategories on (tasks.taskCategoryID = taskCategories.taskCategoryID)";
//            echo($query);
            $query .= " where 0=0 ";
            if(isset($filter->completed)){
                $query .= "and completed = :completed ";
            };
            if(isset($filter->startDate)){
                $query .= "and dateCreated >= :startDate ";
            };
            $query .= "order by dateCreated ";

            $getTasks = $this->conn->prepare($query);
            if(isset($filter->completed)){
                $getTasks->bindParam(':completed', $filter->completed);
            }
            if(isset($filter->startDate)){
                $getTasks->bindParam(':startDate', $filter->startDate);
            }
            $getTasks->execute();

            $records = $getTasks->fetchAll();
//            var_dump($records);
//            $count = sizeof($records);
/*            echo('<Br/><br/><h1>Count</h1>');
            var_dump($count);
           echo($count);*/
            $result = new ResultObjectVO();


            $result->error = false;
            $result->resultObject = [];
            foreach ($records as $row) {
                $task = new TaskVO();
                $task->taskID = (int)$row['taskID'];
                $task->taskCategoryID = (int)$row['taskCategoryID'];
                $task->taskCategory = $row['taskCategory'];
                $task->userID = (int)$row['userID'];
                $task->description = $row['description'];
                if($row['completed'] == true){
                    $task->completed = 1;
                } else {
                    $task->completed = 0;
                }
                $dateCreated = new DateTime();
                $dateCreated->setTimestamp(strtotime($row['dateCreated']));
                $task->dateCreated = date_format($dateCreated,"m/d/Y");

                if($row['dateCompleted']){
                    $dateCompleted = new DateTime();
                    $dateCompleted->setTimestamp(strtotime($row['dateCompleted']));
/*                        var_dump($row['dateCompleted']);echo("<Br/><br/>");
                    var_dump($dateCompleted);echo("<Br/><br/>");*/
                    $task->dateCompleted = date_format($dateCompleted,"m/d/Y") ;
                }
                if($row['dateScheduled']){
                    $dateScheduled = new DateTime();
                    $dateScheduled->setTimestamp(strtotime($row['dateScheduled']));
/*                        echo(strtotime($row['dateScheduled']));echo("<Br/><br/>");
                    var_dump($row['dateScheduled']);echo("<Br/><br/>");
                    var_dump($dateScheduled);echo("<Br/><br/>");*/
                    $task->dateScheduled = date_format($dateScheduled,"m/d/Y") ;
                }
                array_push($result->resultObject, $task);
            }
            return $result;
        }
        catch(Exception $e)
        {
            $result = new ResultObjectVO();
            $result->error = true;
            return $result;
        }
    }

}

?>