package com.dotComIt.learnWith.services;

import com.dotComIt.learnWith.vos.TaskFilterVO;
import com.dotComIt.learnWith.vos.TaskVO;

import java.sql.*;
import java.time.Instant;
import java.util.ArrayList;

public class TaskService {

    Connection connection = null;
    public TaskService(Connection connection) {
        this.connection = connection;
    }

    public TaskVO loadTask(int taskID) {
        String SQL;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        try {
            // query code here
            SQL = "select tasks.*, taskCategories.taskCategory from tasks  left outer join taskCategories on (tasks.taskCategoryID = taskCategories.taskCategoryID) where taskID = ? ";

            pstmt = connection.prepareStatement(SQL);
            pstmt.setInt(1, taskID);

            rs = pstmt.executeQuery();
            if(!rs.isBeforeFirst()){
                return null;
            }  else {
                rs.next();
                System.out.println(rs);

                TaskVO task = new TaskVO();
                task.setTaskID(rs.getInt("taskID"));
                task.setTaskCategoryID(rs.getInt("taskCategoryID"));
                task.setTaskCategory(rs.getString("taskCategory"));
                task.setUserID(rs.getInt("userID"));
                task.setDescription(rs.getString("description"));
                if(rs.getBoolean("completed")){
                    task.setCompleted(true);
                } else {
                    task.setCompleted(false);
                }
                task.setDateCreatedAsUTCString(rs.getTimestamp("dateCreated").toInstant().toString());
                if(rs.getDate("dateCompleted") != null){
                    task.setDateCompletedAsUTCString(rs.getTimestamp("dateCompleted").toInstant().toString());
                }
                if(rs.getDate("dateScheduled") != null){
                    task.setDateScheduledAsUTCString(rs.getTimestamp("dateScheduled").toInstant().toString());
                }
                return task;
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        finally {
            if (rs != null) try { rs.close(); } catch(Exception e) {}
            if (pstmt != null) try { pstmt.close(); } catch(Exception e) {}
            if (connection != null) try { connection.close(); } catch(Exception e) {}
        }
        return null;
    }

    public TaskVO createTask(TaskVO taskVO){
        if (taskVO.getUserID() == 0) {
            return null;
        }
        String SQL;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        try{
            // query code here
            SQL = "insert into tasks(taskCategoryID, userID, description, completed, dateCreated) values(?,?, ?, 0, ? ) SELECT SCOPE_IDENTITY() as taskID";
            pstmt = connection.prepareStatement(SQL);
            if(taskVO.getTaskCategoryID() != 0){
                pstmt.setInt(1, taskVO.getTaskCategoryID());
            } else {
                pstmt.setNull(1, Types.INTEGER);
            }
            pstmt.setInt(2, taskVO.getUserID());
            pstmt.setString(3, taskVO.getDescription());

            String UTCDateTime = Instant.now().toString();
            pstmt.setTimestamp(4, java.sql.Timestamp.from( Instant.parse(UTCDateTime)));

            pstmt.executeUpdate();
            rs = pstmt.getGeneratedKeys();
            while(rs.next()){
                System.out.println(rs.getInt("taskID"));
                return loadTask(rs.getInt("taskID"));
            }
        }
        catch (Exception e) {
            System.out.println("TaskService createTask Exception");
            e.printStackTrace();
        }
        finally {
            if (rs != null) try { rs.close(); } catch(Exception e) {}
            if (pstmt != null) try { pstmt.close(); } catch(Exception e) {}
            if (connection != null) try { connection.close(); } catch(Exception e) {}
        };
        return null;
    }

    public TaskVO updateTask(TaskVO taskVO, int taskID){
        String SQL;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        try {
            // query code here
            SQL = "update tasks set taskCategoryID = ?, description = ? where taskID = ?";
            pstmt = connection.prepareStatement(SQL);
            if(taskVO.getTaskCategoryID() != 0){
                pstmt.setInt(1, taskVO.getTaskCategoryID());
            } else {
                pstmt.setNull(1, Types.INTEGER);
            }
            pstmt.setString(2, taskVO.getDescription());
            pstmt.setInt(3, taskID);
            pstmt.executeUpdate();

            return loadTask(taskID);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        finally {
            if (rs != null) try { rs.close(); } catch(Exception e) {}
            if (pstmt != null) try { pstmt.close(); } catch(Exception e) {}
            if (connection != null) try { connection.close(); } catch(Exception e) {}
        };
        return null;
    }

    public TaskVO completeTask(int taskID, boolean completed){
        String SQL;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        try
        {
            // DB Processing code here
            SQL = "update tasks set completed = ?, dateCompleted = ? where taskID = ?";
            pstmt = connection.prepareStatement(SQL);
            pstmt.setBoolean(1, completed);
            if(completed){
                String UTCDateTime = Instant.now().toString();
                pstmt.setTimestamp(2, java.sql.Timestamp.from( Instant.parse(UTCDateTime)));
            } else {
                pstmt.setNull(2, Types.DATE);
            }
            pstmt.setInt(3, taskID);
            pstmt.executeUpdate();

            TaskFilterVO filter = new TaskFilterVO();
            filter.setTaskID(taskID);
            System.out.println("________ Loading Task _________");
            System.out.println(taskID);


            return loadTask(taskID);

        }
        catch (Exception e) {
            e.printStackTrace();
        }
        finally {
            if (rs != null) try { rs.close(); } catch(Exception e) {}
            if (pstmt != null) try { pstmt.close(); } catch(Exception e) {}
            if (connection != null) try { connection.close(); } catch(Exception e) {}
        };
        return null;
    }

}
