package com.dotComIt.learnWith.api;

import com.dotComIt.learnWith.config.DatabaseConfig;
import com.dotComIt.learnWith.services.TaskService;
import com.dotComIt.learnWith.vos.ResultObjectVO;
import com.dotComIt.learnWith.vos.ScheduleTaskArgumentsVO;

import javax.ws.rs.Consumes;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.time.LocalDate;

@Path("task/schedule")
public class TaskScheduleWrapper {

    private DatabaseConfig dc;
    private TaskService ts;

    public TaskScheduleWrapper(){
        System.out.println("In Task Schedule Wrapper Constructor");
        dc = new DatabaseConfig();
        ts = new TaskService(dc.openConnection());
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public ResultObjectVO updateTask(ScheduleTaskArgumentsVO data){
        LocalDate dateScheduled = null;
        if(data.getDateScheduled() != null){
            // expecting date in format of yyyy-mm-dd for this to work
            dateScheduled = LocalDate.parse(data.getDateScheduled());
        }
        if(data.getTaskID() == 0){
            // AKA taskID is not passed and defaulted to 0
            return ts.scheduleTaskList (data.getTaskIDList(), dateScheduled);
        } else {
            return ts.scheduleTask (data.getTaskID(), dateScheduled);
        }
    }

}
