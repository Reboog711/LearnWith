<?php
require_once  dirname(__FILE__) . '/../vos/TaskCategoryVO.php';

class TaskCategoriesService {
    private $conn;
    function __construct($conn) {
        $this->conn = $conn;
    }

    function getTaskCategories(){

        try
        {
            // DB Query code here
            $query = "select * from taskCategories order by taskCategory";
            $getTaskCategories = $this->conn->prepare($query);
            $getTaskCategories->execute();
            $results = [];
            $records = $getTaskCategories->fetchAll();
            foreach ($records as $row) {
                $task = new TaskCategoryVO();
                $task->taskCategoryID = (int)$row['taskCategoryID'];
                $task->taskCategory = $row['taskCategory'];
                array_push($results, $task);
            }
            return $results;


        }
        catch(Exception $e)
        {
            return $e;
        }

    }

}

?>