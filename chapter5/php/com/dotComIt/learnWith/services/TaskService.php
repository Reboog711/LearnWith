<?php
require_once  dirname(__FILE__) . '/../vos/TaskVO.php';


class TaskService
{
    private $conn;
    function __construct($conn) {
        $this->conn = $conn;
    }

    function loadTask($taskID){
        try{
            // query code here
            $query = "select tasks.*, taskCategories.taskCategory from tasks left outer join taskCategories on (tasks.taskCategoryID = taskCategories.taskCategoryID)";
            $query .= "where taskID = :taskID ";
            $getTask = $this->conn->prepare($query);
            $getTask->bindParam(':taskID', $taskID);
            $getTask->execute();
            $records = $getTask->fetchAll();

            $taskCount = sizeof($records);
            if($taskCount === 1){
                $row = $records[0];
                $dateFormat = "Y-m-d\TH:i:s.v\Z";
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
                $task->dateCreatedAsUTCString = date_format($dateCreated,$dateFormat);
                if($row['dateCompleted']){
                    $dateCompleted = new DateTime();
                    $dateCompleted->setTimestamp(strtotime($row['dateCompleted']));
                    $task->dateCompletedAsUTCString = date_format($dateCompleted,$dateFormat) ;
                } else {
                    $task->dateCompletedAsUTCString = "";
                }
                if($row['dateScheduled']){
                    $dateScheduled = new DateTime();
                    $dateScheduled->setTimestamp(strtotime($row['dateScheduled']));
                    $task->dateScheduledAsUTCString = date_format($dateScheduled,$dateFormat) ;
                } else {
                    $task->dateScheduledAsUTCString = "";
                }
                return $task;
            } else {
                return null;
            }
        }
        catch(Exception $e){
            return $e;
        }
    }

    function createTask($taskCategoryID, $userID, $description){
        try
        {
            // query code here
            $query = "insert into tasks(
                  taskCategoryID, userID, description, completed, dateCreated
              ) values(
                :taskCategoryID, :userID, :description, 0,:dateCreated
             )  
             SELECT SCOPE_IDENTITY() as taskID";

            $createTask = $this->conn->prepare($query);
            if($taskCategoryID !== 0){
                $createTask->bindParam(':taskCategoryID', $taskCategoryID);
            } else {
                $createTask->bindValue(':taskCategoryID', null);
            }
            $createTask->bindParam(':userID', $userID);
            $createTask->bindParam(':description', $description);
            $dateCreated = new DateTime();
            $dateCreated->setTimezone(new DateTimeZone('UTC'));
            $dateCreated = date_format($dateCreated, 'Y-m-d H:i:s');
            $createTask->bindParam(':dateCreated', $dateCreated);


            $createTask->execute();
            $createTask->nextRowset();
            $records = $createTask->fetchAll();
            $row = $records[0];
            return self::loadTask($row["taskID"]);
        }
        catch(Exception $e)
        {
            return $e;
        }
    }

    function updateTask($taskID, $taskCategoryID, $description){
        try{
            $query = "update tasks set
                      taskCategoryID = :taskCategoryID,
                      description = :description
                      where taskID = :taskID";
            $updateTask = $this->conn->prepare($query);
            if($taskCategoryID !== 0){
                $updateTask->bindParam(':taskCategoryID', $taskCategoryID);
            } else {
                $updateTask->bindValue(':taskCategoryID', null);
            }
            $updateTask->bindParam(':description', $description);
            $updateTask->bindParam(':taskID', $taskID);
            $updateTask->execute();
            return self::loadTask($taskID);


        }
        catch(Exception $e)
        {
            return $e;
        }
    }


}

?>