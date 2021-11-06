<?php
require_once  dirname(__FILE__) . '/../vos/TaskFilterVO.php';
require_once  dirname(__FILE__) . '/../vos/TaskVO.php';


class TasksService
{
    private $conn;
    function __construct($conn) {
        $this->conn = $conn;
    }

    function getFilteredTasks(TaskFilterVO $filter){
        try{
            // query code here
            $query = "select tasks.*, taskCategories.taskCategory from tasks join taskCategories on (tasks.taskCategoryID = taskCategories.taskCategoryID)";
            $query .= " where 0=0 ";
            if(isset($filter->completed)){
                $query .= "and completed = :completed ";
            };
            if(isset($filter->taskCategoryID)){
                if($filter->taskCategoryID != 0){
                    $query .= "and tasks.taskCategoryID = :taskCategoryID ";
                }
            };
            if(isset($filter->startDateAsUTCString)){
                $query .= "and dateCreated >= :startDate ";
            };
            if(isset($filter->endDateAsUTCString)){
                $query .= "and dateCreated <= :endDate ";
            };
            if(isset($filter->scheduledStartDateAsUTCString)){
                $query .= "and dateScheduled >= :scheduledStartDate ";
            };
            if(isset($filter->scheduledEndDateAsUTCString)){
                $query .= "and dateScheduled <= :scheduledEndDate ";
            };

            $query .= "order by dateCreated ";
            $getTasks = $this->conn->prepare($query);
            if(isset($filter->completed)){
                $getTasks->bindParam(':completed', $filter->completed);
            }
            if(isset($filter->taskCategoryID)){
                if($filter->taskCategoryID != 0) {
                    $getTasks->bindParam(':taskCategoryID', $filter->taskCategoryID);
                }
            }

            if(isset($filter->startDateAsUTCString)){
                $getTasks->bindParam(':startDate', $filter->startDateAsUTCString);
            }
            if(isset($filter->endDateAsUTCString)){
                $getTasks->bindParam(':endDate', $filter->endDateAsUTCString);
            };
            if(isset($filter->scheduledStartDateAsUTCString)){
                $getTasks->bindParam(':scheduledStartDate', $filter->scheduledStartDateAsUTCString);
            };
            if(isset($filter->scheduledEndDateAsUTCString)){
                $getTasks->bindParam(':scheduledEndDate', $filter->scheduledEndDateAsUTCString);
            };



            $getTasks->execute();
            $records = $getTasks->fetchAll();

            $results = [];
            foreach ($records as $row) {
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
                array_push($results, $task);
            }
            return $results;

        }
        catch(Exception $e){
/*            echo("Error!");
            $r = new RestExceptionVO();
            $r->message = $e.getMessage();*/
            return $e;
        }

    }


}

?>