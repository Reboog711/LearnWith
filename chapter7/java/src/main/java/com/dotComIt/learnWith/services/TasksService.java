package com.dotComIt.learnWith.services;

import com.dotComIt.learnWith.vos.ResultMessageVO;
import com.dotComIt.learnWith.vos.TaskFilterVO;
import com.dotComIt.learnWith.vos.TaskVO;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Types;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
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
            SQL = "select tasks.*, taskCategories.taskCategory from tasks left outer join taskCategories on (tasks.taskCategoryID = taskCategories.taskCategoryID)";
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
            if(taskFilterVO.getTaskID() != 0){
                SQL += "and taskID = ? ";
            }
            if(taskFilterVO.getScheduledEqualDateAsUTCString() != null){
                SQL += "and dateScheduled >= ? and dateScheduled  < ? ";
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
            if(taskFilterVO.getTaskID() != 0){
                pstmt.setInt(parameterCounter, taskFilterVO.getTaskID());
                parameterCounter++;
            }
            if(taskFilterVO.getScheduledEqualDateAsUTCString() != null){
                Instant scheduleEqualDate = Instant.parse( taskFilterVO.getScheduledEqualDateAsUTCString());
                Instant scheduleEqualDatePlusOne = scheduleEqualDate.plus(24 , ChronoUnit.HOURS);
                System.out.println("________ dates _________");

                System.out.println(scheduleEqualDate.toString());
                System.out.println(scheduleEqualDatePlusOne.toString());

                pstmt.setTimestamp(parameterCounter, java.sql.Timestamp.from( scheduleEqualDate  ) );
                System.out.println(java.sql.Timestamp.from( scheduleEqualDate  ));
                System.out.println(java.sql.Timestamp.from( scheduleEqualDatePlusOne  ));

                parameterCounter ++;
                pstmt.setTimestamp(parameterCounter, java.sql.Timestamp.from( scheduleEqualDatePlusOne ));
                parameterCounter ++;
            }
            System.out.println(pstmt.toString());
            System.out.println(SQL);

            rs = pstmt.executeQuery();
            while(rs.next()){
                System.out.println("found one");
                System.out.println(rs.getInt("taskID"));
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

    public ResultMessageVO scheduleTaskList(String taskIDList, String dateScheduledAsUTCString){
        String SQL;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        ResultMessageVO result = new ResultMessageVO();
        try
        {
            // DB Access Code Here
            SQL = "update tasks set dateScheduled = ? where taskID in ("+ taskIDList + ")";
            pstmt = connection.prepareStatement(SQL);
            if(dateScheduledAsUTCString != null){
                pstmt.setTimestamp(1, java.sql.Timestamp.from( Instant.parse(dateScheduledAsUTCString)));
            } else {
                pstmt.setNull(1, Types.DATE);
            }
            pstmt.executeUpdate();
            result.setMessage("Updated!");
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        finally {
            if (rs != null) try { rs.close(); } catch(Exception e) {}
            if (pstmt != null) try { pstmt.close(); } catch(Exception e) {}
            if (connection != null) try { connection.close(); } catch(Exception e) {}
        };
        return result;
    }


}
