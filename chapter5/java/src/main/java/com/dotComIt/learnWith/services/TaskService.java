package com.dotComIt.learnWith.services;

import com.dotComIt.learnWith.vos.ResultObjectVO;
import com.dotComIt.learnWith.vos.TaskCategoryVO;
import com.dotComIt.learnWith.vos.TaskFilterVO;
import com.dotComIt.learnWith.vos.TaskVO;

import java.sql.*;
import java.time.LocalDate;
import java.util.ArrayList;

public class TaskService {

    Connection connection = null;

    public TaskService(Connection connection) {
        this.connection = connection;
    }

    public ResultObjectVO getFilteredTasks(TaskFilterVO filter){

        String SQL;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        ResultObjectVO ro = new ResultObjectVO();

        try {

            // using a prepared statement which is better suited against injection attacks
            SQL = "select tasks.*, taskCategories.taskCategory from tasks join taskCategories on (tasks.taskCategoryID = taskCategories.taskCategoryID)";
            SQL += " where 0=0 ";
            if(filter.getCompleted() != null){
                SQL += "and completed = ? ";
            }
            if(filter.getTaskCategoryID() != 0){
                SQL += "and tasks.taskCategoryID = ? ";
            }
            if(filter.getTaskID() != 0){
                SQL += "and taskID = ? ";
            }
            if(filter.getStartDate() != null){
                SQL += "and dateCreated >= ? ";
            }
            if(filter.getEndDate() != null){
                SQL += "and dateCreated <= ? ";
            }
            if(filter.getScheduledStartDate() != null){
                SQL += "and dateScheduled >= ? ";
            }
            if(filter.getScheduledEndDate() != null){
                SQL += "and dateScheduled <= ? ";
            }
            SQL += "order by dateCreated ";

            System.out.println(SQL );
            pstmt = connection.prepareStatement(SQL);
            int parameterCounter = 1;
            if(filter.getCompleted() != null){
                pstmt.setBoolean(parameterCounter, filter.getCompleted());
                parameterCounter++;
            }
            if(filter.getTaskCategoryID() != 0){
                pstmt.setInt(parameterCounter, filter.getTaskCategoryID());
                parameterCounter++;
            }
            if(filter.getTaskID() != 0){
                pstmt.setInt(parameterCounter, filter.getTaskID());
                parameterCounter++;
            }
            if(filter.getStartDate() != null){
                pstmt.setDate(parameterCounter,  Date.valueOf( filter.getStartDate() ));
                parameterCounter++;
            }
            if(filter.getEndDate() != null){
                pstmt.setDate(parameterCounter,  Date.valueOf( filter.getEndDate() ));
                parameterCounter++;
            }
            if(filter.getScheduledStartDate() != null){
                pstmt.setDate(parameterCounter,  Date.valueOf( filter.getScheduledStartDate() ));
                parameterCounter++;
            }
            if(filter.getScheduledEndDate() != null){
                pstmt.setDate(parameterCounter,  Date.valueOf( filter.getScheduledEndDate() ));
                parameterCounter++;
            }

            rs = pstmt.executeQuery();

            ro.setError(false);

            ArrayList<TaskVO> tasks = new ArrayList<TaskVO>();
            while(rs.next()){

                // save results
                TaskVO task = new TaskVO();
                task.setTaskID(rs.getInt("taskID"));
                task.setTaskCategoryID(rs.getInt("taskCategoryID"));
                task.setTaskCategory(rs.getString("taskCategory"));
                task.setUserID(rs.getInt("userID"));
                task.setDescription(rs.getString("description"));
                // this could be wrong
                if(rs.getBoolean("completed")){
                    task.setCompleted(true);
                } else {
                    task.setCompleted(false);
                }
                // dates
                task.setDateCreated(rs.getDate("dateCreated").toLocalDate());

                if(rs.getDate("dateCompleted") != null){
                    task.setDateCompleted(rs.getDate("dateCompleted").toLocalDate());
                }
                if(rs.getDate("dateScheduled") != null){
                    task.setDateScheduled(rs.getDate("dateScheduled").toLocalDate());
                }

                tasks.add(task);
            }
            ro.setResultObject(tasks);
        }
        catch (Exception e) {
            System.out.println("TaskService getFilteredTasks Exception");
            e.printStackTrace();
            ro.setError(true);
        }
        finally {
            if (rs != null) try { rs.close(); } catch(Exception e) {}
            if (pstmt != null) try { pstmt.close(); } catch(Exception e) {}
            if (connection != null) try { connection.close(); } catch(Exception e) {}
        };

        return ro;
    };


    public ResultObjectVO getTaskCategories(){

        String SQL;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        ResultObjectVO ro = new ResultObjectVO();

        try {

            // using a prepared statement which is better suited against injection attacks
            SQL = "select * from taskCategories order by taskCategory";
            pstmt = connection.prepareStatement(SQL);
            rs = pstmt.executeQuery();

            ro.setError(false);

            ArrayList<TaskCategoryVO> taskCategories = new ArrayList<TaskCategoryVO>();
            while(rs.next()){

                // save results
                TaskCategoryVO taskCategory = new TaskCategoryVO();
                taskCategory.setTaskCategoryID(rs.getInt("taskCategoryID"));
                taskCategory.setTaskCategory(rs.getString("taskCategory"));

                taskCategories.add(taskCategory);
            }
            ro.setResultObject(taskCategories);
        }
        catch (Exception e) {
            System.out.println("TaskService getTaskCategories Exception");
            e.printStackTrace();
            ro.setError(true);
        }
        finally {
            if (rs != null) try { rs.close(); } catch(Exception e) {}
            if (pstmt != null) try { pstmt.close(); } catch(Exception e) {}
            if (connection != null) try { connection.close(); } catch(Exception e) {}
        };

        return ro;
    };

    public ResultObjectVO createTask(int taskCategoryID, int userID, String description){

        String SQL;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        ResultObjectVO ro = new ResultObjectVO();

        try {

            // using a prepared statement which is better suited against injection attacks
            SQL = "insert into tasks(taskCategoryID, userID, description, completed, dateCreated) values(?,?, ?, 0, ? ) SELECT SCOPE_IDENTITY() as taskID";

            System.out.println(SQL );
            pstmt = connection.prepareStatement(SQL);
            if(taskCategoryID != 0){
                pstmt.setInt(1, taskCategoryID);
            } else {
                pstmt.setNull(1, Types.INTEGER);
            }
            pstmt.setInt(2, userID);
            pstmt.setString(3, description);
            LocalDate dateCreated = LocalDate.now();
            pstmt.setObject(4, dateCreated);
            pstmt.executeUpdate();
            // get the second result set
            rs = pstmt.getGeneratedKeys();

            while(rs.next()){
                TaskFilterVO filter = new TaskFilterVO();
                filter.setTaskID(rs.getInt("taskID"));
                return getFilteredTasks(filter);
            }
        }
        catch (Exception e) {
            System.out.println("TaskService createTask Exception");
            e.printStackTrace();
            ro.setError(true);
        }
        finally {
            if (rs != null) try { rs.close(); } catch(Exception e) {}
            if (pstmt != null) try { pstmt.close(); } catch(Exception e) {}
            if (connection != null) try { connection.close(); } catch(Exception e) {}
        };

        return ro;
    };

    public ResultObjectVO updateTask(int taskID, int taskCategoryID, String description){

        String SQL;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        ResultObjectVO ro = new ResultObjectVO();

        try {

            // using a prepared statement which is better suited against injection attacks
            SQL = "update tasks set taskCategoryID = ?, description = ? where taskID = ?";

            System.out.println(SQL );
            pstmt = connection.prepareStatement(SQL);
            if(taskCategoryID != 0){
                pstmt.setInt(1, taskCategoryID);
            } else {
                pstmt.setNull(1, Types.INTEGER);
            }
            pstmt.setString(2, description);
            pstmt.setInt(3, taskID);

            pstmt.executeUpdate();

            TaskFilterVO filter = new TaskFilterVO();
            filter.setTaskID(taskID);
            return getFilteredTasks(filter);
        }
        catch (Exception e) {
            System.out.println("TaskService UpdateTask Exception");
            e.printStackTrace();
            ro.setError(true);
        }
        finally {
            if (rs != null) try { rs.close(); } catch(Exception e) {}
            if (pstmt != null) try { pstmt.close(); } catch(Exception e) {}
            if (connection != null) try { connection.close(); } catch(Exception e) {}
        };

        return ro;
    };

}
