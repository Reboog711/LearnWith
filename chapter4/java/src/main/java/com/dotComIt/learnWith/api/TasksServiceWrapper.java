package com.dotComIt.learnWith.api;
import com.dotComIt.learnWith.config.DatabaseConfig;
import com.dotComIt.learnWith.services.TasksService;
import com.dotComIt.learnWith.vos.TaskFilterVO;
import com.dotComIt.learnWith.vos.TaskVO;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;

import java.util.ArrayList;

@Path("tasks")
public class TasksServiceWrapper {
    private DatabaseConfig dc;
    private TasksService ts;
    public TasksServiceWrapper(){
        dc = new DatabaseConfig();
        ts = new TasksService(dc.openConnection());
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public ArrayList<TaskVO> getFilteredTasks(
            @QueryParam("completed") Boolean completed,
            @QueryParam("taskCategoryID") int taskCategoryID,
            @QueryParam("startDateAsUTCString") String startDateAsUTCString,
            @QueryParam("endDateAsUTCString") String endDateAsUTCString,
            @QueryParam("scheduledStartDateAsUTCString") String scheduledStartDateAsUTCString,
            @QueryParam("scheduledEndDateAsUTCString") String scheduledEndDateAsUTCString
    ){
        System.out.println("---- getFilteredTasks ---");
        System.out.println(startDateAsUTCString);
        System.out.println(completed);

        TaskFilterVO filter = new TaskFilterVO();
        if(completed != null){
            filter.setCompleted(completed);
        }
        if(startDateAsUTCString != null){
            filter.setStartDateAsUTCString(startDateAsUTCString);
        }
        if(taskCategoryID != 0){
            filter.setTaskCategoryID(taskCategoryID);
        }
        if(endDateAsUTCString != null){
            filter.setEndDateAsUTCString(endDateAsUTCString);
        }
        if(scheduledStartDateAsUTCString != null){
            filter.setScheduledStartDateAsUTCString(scheduledStartDateAsUTCString);
        }
        if(scheduledEndDateAsUTCString != null){
            filter.setScheduledEndDateAsUTCString(scheduledEndDateAsUTCString);
        }



        return ts.getFilteredTasks(filter);
    }

}
