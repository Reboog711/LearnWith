package com.dotComIt.learnWith.api;


import com.dotComIt.learnWith.config.DatabaseConfig;
import com.dotComIt.learnWith.services.AuthenticationService;
import com.dotComIt.learnWith.services.TaskService;
import com.dotComIt.learnWith.vos.ResultObjectVO;
import com.dotComIt.learnWith.vos.TaskFilterVO;
import com.dotComIt.learnWith.vos.UserVO;

import javax.ws.rs.*;
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
    public ResultObjectVO getFilteredTasks(@QueryParam("completed") Boolean completed, @QueryParam("startDate") String startDate){
        TaskFilterVO filter = new TaskFilterVO();
        if(completed != null){
            filter.setCompleted(completed);
        }
        if(startDate != null){
            // expecting date in format of yyyy-mm-dd for this to work
            filter.setStartDate(LocalDate.parse(startDate));
        }
        return ts.getFilteredTasks(filter);
    }


}
