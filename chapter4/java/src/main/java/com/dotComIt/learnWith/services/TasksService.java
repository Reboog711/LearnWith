package com.dotComIt.learnWith.services;

import com.dotComIt.learnWith.vos.TaskFilterVO;
import com.dotComIt.learnWith.vos.TaskVO;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.time.Instant;
import java.util.ArrayList;

public class TasksService {
    Connection connection = null;
    public TasksService(Connection connection) {
        this.connection = connection;
    }

    public ArrayList<TaskVO> getFilteredTasks(TaskFilterVO taskFilterVO){
        String SQL;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        ArrayList<TaskVO> tasks = new ArrayList<TaskVO>();
        try {
            // query code here
            SQL = "select tasks.*, taskCategories.taskCategory from tasks  left outer join taskCategories on (tasks.taskCategoryID = taskCategories.taskCategoryID)";
            SQL += " where 0=0 ";
            if(taskFilterVO.getCompleted() != null){
                SQL += "and completed = ? ";
            }
            if(taskFilterVO.getStartDateAsUTCString() != null){

                SQL += "and dateCreated >= ? ";
            }
            if(taskFilterVO.getTaskCategoryID() != 0){
                SQL += "and tasks.taskCategoryID = ? ";
            }
            if(taskFilterVO.getEndDateAsUTCString() != null){
                SQL += "and dateCreated <= ? ";
            }
            if(taskFilterVO.getScheduledStartDateAsUTCString() != null){
                SQL += "and dateScheduled >= ? ";
            }
            if(taskFilterVO.getScheduledEndDateAsUTCString() != null){
                SQL += "and dateScheduled <= ? ";
            }

            SQL += "order by dateCreated ";
            pstmt = connection.prepareStatement(SQL);

            int parameterCounter = 1;
            if(taskFilterVO.getCompleted() != null){
                pstmt.setBoolean(parameterCounter, taskFilterVO.getCompleted());
                parameterCounter++;
            }
            if(taskFilterVO.getStartDateAsUTCString() != null){
                pstmt.setTimestamp(parameterCounter, java.sql.Timestamp.from( Instant.parse( taskFilterVO.getStartDateAsUTCString()) ) );

                parameterCounter++;
            }
            if(taskFilterVO.getTaskCategoryID() != 0){
                pstmt.setInt(parameterCounter, taskFilterVO.getTaskCategoryID());
                parameterCounter++;
            }
            if(taskFilterVO.getEndDateAsUTCString() != null){
                pstmt.setTimestamp(parameterCounter, java.sql.Timestamp.from( Instant.parse( taskFilterVO.getEndDateAsUTCString()) ) );
                parameterCounter++;
            }
            if(taskFilterVO.getScheduledStartDateAsUTCString() != null){
                pstmt.setTimestamp(parameterCounter, java.sql.Timestamp.from( Instant.parse( taskFilterVO.getScheduledStartDateAsUTCString()) ) );
                parameterCounter++;
            }
            if(taskFilterVO.getScheduledEndDateAsUTCString() != null){
                pstmt.setTimestamp(parameterCounter, java.sql.Timestamp.from( Instant.parse( taskFilterVO.getScheduledEndDateAsUTCString()) ) );
                parameterCounter++;
            }


            rs = pstmt.executeQuery();
            while(rs.next()){
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
                tasks.add(task);
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
        return tasks;
    }

}
