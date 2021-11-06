package com.dotComIt.learnWith.services;

import com.dotComIt.learnWith.vos.TaskCategoryVO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

public class TaskCategoriesService {

    Connection connection = null;

    public TaskCategoriesService(Connection connection) {
        this.connection = connection;
    }

    public ArrayList<TaskCategoryVO> getTaskCategories(){
        String SQL;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        ArrayList<TaskCategoryVO> results = new ArrayList<TaskCategoryVO>();
        try {
            // DB Query code here
            SQL = "select * from taskCategories order by taskCategory";
            pstmt = connection.prepareStatement(SQL);
            rs = pstmt.executeQuery();
            while(rs.next()){
                TaskCategoryVO taskCategory = new TaskCategoryVO();
                taskCategory.setTaskCategoryID(rs.getInt("taskCategoryID"));
                taskCategory.setTaskCategory(rs.getString("taskCategory"));
                results.add(taskCategory);
            }


        }
        catch (Exception e) {
            e.printStackTrace();
        }
        finally {
            if (rs != null) try { rs.close(); } catch(Exception e) {}
            if (pstmt != null) try { pstmt.close(); } catch(Exception e) {}
            if (connection != null) try { connection.close(); } catch(Exception e) {}
        };
        return results;
    }


}
