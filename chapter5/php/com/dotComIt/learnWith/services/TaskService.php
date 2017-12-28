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
require_once  dirname(__FILE__) . '/../vos/TaskCategoryVO.php';

class TaskService{

    private $conn;

    function __construct($conn) {
        $this->conn = $conn;
    }

    function getFilteredTasks(TaskFilterVO $filter)
    {

        try
        {
            // for PDO queries
            $query = "select tasks.*, taskCategories.taskCategory from tasks join taskCategories on (tasks.taskCategoryID = taskCategories.taskCategoryID)";
//            echo($query);
            $query .= " where 0=0 ";
            if(isset($filter->completed)){
                $query .= "and completed = :completed ";
            };
            if(isset($filter->taskID)){
                $query .= "and taskID = :taskID ";
            };
            if(isset($filter->taskCategoryID)){
                if($filter->taskCategoryID != 0){
                    $query .= "and tasks.taskCategoryID = :taskCategoryID ";
                }
            };
            if(isset($filter->startDate)){
                $query .= "and dateCreated >= :startDate ";
            };
            if(isset($filter->endDate)){
                $query .= "and dateCreated <= :endDate ";
            };
            if(isset($filter->scheduledStartDate)){
                $query .= "and dateScheduled >= :scheduledStartDate ";
            };
            if(isset($filter->scheduledEndDate)){
                $query .= "and dateScheduled <= :scheduledEndDate ";
            };
            $query .= "order by dateCreated ";


            $getTasks = $this->conn->prepare($query);
            if(isset($filter->completed)){
                $getTasks->bindParam(':completed', $filter->completed);
            }
            if(isset($filter->taskID)){
                $getTasks->bindParam(':taskID', $filter->taskID);
            };
            if(isset($filter->taskCategoryID)){
                if($filter->taskCategoryID != 0) {
                    $getTasks->bindParam(':taskCategoryID', $filter->taskCategoryID);
                }
            }
            if(isset($filter->startDate)){
                $getTasks->bindParam(':startDate', $filter->startDate);
            }
            if(isset($filter->endDate)){
                $getTasks->bindParam(':endDate', $filter->endDate);
            };
            if(isset($filter->scheduledStartDate)){
                $getTasks->bindParam(':scheduledStartDate', $filter->scheduledStartDate);
            };
            if(isset($filter->scheduledEndDate)){
                $getTasks->bindParam(':scheduledEndDate', $filter->scheduledEndDate);
            };
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
//                echo($task->completed);

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


    function getTaskCategories()
    {

        try
        {
            // for PDO queries
            $query = "select * from taskCategories order by taskCategory";

            $getTaskCategories = $this->conn->prepare($query);
            $getTaskCategories->execute();

            $result = new ResultObjectVO();
            $result->error = false;
            $result->resultObject = [];

            $records = $getTaskCategories->fetchAll();

            foreach ($records as $row) {
                $task = new TaskCategoryVO();
                $task->taskCategoryID = (int)$row['taskCategoryID'];
                $task->taskCategory = $row['taskCategory'];
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

    function createTask($taskCategoryID, $userID, $description){

        try
        {
            // for PDO queries
            $query = "insert into tasks(
                taskCategoryID, userID, description, completed, dateCreated
              ) values(
                :taskCategoryID,
                :userID,
                :description,
                0,
                :dateCreated
             )  
             SELECT SCOPE_IDENTITY() as taskID";

            $createTask = $this->conn->prepare($query);

            // add parameters
            if($taskCategoryID !== 0){
                $createTask->bindParam(':taskCategoryID', $taskCategoryID);
            } else {
                $createTask->bindValue(':taskCategoryID', null);
            }

            $createTask->bindParam(':userID', $userID);
            $createTask->bindParam(':description', $description);
            $dateCreated = date("Y-m-d");
            $createTask->bindParam(':dateCreated', $dateCreated);

            $createTask->execute();

            $createTask->nextRowset();
            $records = $createTask->fetchAll();

            $row = $records[0];
            $taskFilter = new TaskFilterVO();
            $taskFilter->taskID = $row['taskID'];
            return self::getFilteredTasks($taskFilter);

        }
        catch(Exception $e)
        {
            $result = new ResultObjectVO();
            $result->error = true;
            $result->resultObject = $e;
            return $result;
        }
    }

    function updateTask($taskID, $taskCategoryID, $description){
        try
        {
            // for PDO queries
            $query = "update tasks set
                      taskCategoryID = :taskCategoryID,
                      description = :description
                      where taskID = :taskID";

            $updateTask = $this->conn->prepare($query);

            // add parameters
            if($taskCategoryID !== 0){
                $updateTask->bindParam(':taskCategoryID', $taskCategoryID);
            } else {
                $updateTask->bindValue(':taskCategoryID', null);
            }
            $updateTask->bindParam(':taskID', $taskID);
            $updateTask->bindParam(':description', $description);

           $updateTask->execute();

            $taskFilter = new TaskFilterVO();
            $taskFilter->taskID = $taskID;
            return self::getFilteredTasks($taskFilter);

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