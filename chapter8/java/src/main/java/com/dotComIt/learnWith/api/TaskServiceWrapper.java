package com.dotComIt.learnWith.api;


import com.dotComIt.learnWith.config.DatabaseConfig;
import com.dotComIt.learnWith.services.TaskService;
import com.dotComIt.learnWith.vos.ResultObjectVO;
import com.dotComIt.learnWith.vos.TaskFilterVO;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import java.time.LocalDate;

@Path("tasks")
public class TaskServiceWrapper {

    private DatabaseConfig dc;
    private TaskService ts;

    public TaskServiceWrapper(){
        System.out.println("In Task Service Wrapper Constructor");
        dc = new DatabaseConfig();
        ts = new TaskService(dc.openConnection());
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public ResultObjectVO getFilteredTasks(@QueryParam("completed") Boolean completed,
                                           @QueryParam("taskCategoryID") int taskCategoryID,
                                           @QueryParam("startDate") String startDate,
                                           @QueryParam("endDate") String endDate,
                                           @QueryParam("scheduledStartDate") String scheduledStartDate,
                                           @QueryParam("scheduledEndDate") String scheduledEndDate,
                                           @QueryParam("scheduledEqualDate") String scheduledEqualDate
                                           ){
        System.out.println(taskCategoryID);
        TaskFilterVO filter = new TaskFilterVO();
        if(completed != null){
            filter.setCompleted(completed);
        }
        if(taskCategoryID != 0){
            filter.setTaskCategoryID(taskCategoryID);
        }
        if(startDate != null){
            // expecting date in format of yyyy-mm-dd for this to work
            filter.setStartDate(LocalDate.parse(startDate));
        }
        if(endDate != null){
            // expecting date in format of yyyy-mm-dd for this to work
            filter.setEndDate(LocalDate.parse(endDate));
        }
        if(scheduledStartDate != null){
            // expecting date in format of yyyy-mm-dd for this to work
            filter.setScheduledStartDate(LocalDate.parse(scheduledStartDate));
        }
        if(scheduledEndDate != null){
            // expecting date in format of yyyy-mm-dd for this to work
            filter.setScheduledEndDate(LocalDate.parse(scheduledEndDate));
        }
        if(scheduledEqualDate != null){
            // expecting date in format of yyyy-mm-dd for this to work
            System.out.println("Adding in Schedule Equal Date");
            filter.setScheduledEqualDate(LocalDate.parse(scheduledEqualDate));
        }
        return ts.getFilteredTasks(filter);
    }


}
