package com.dotComIt.learnWith.api;

import com.dotComIt.learnWith.config.DatabaseConfig;
import com.dotComIt.learnWith.services.TaskService;
import com.dotComIt.learnWith.vos.ResultObjectVO;
import com.dotComIt.learnWith.vos.TaskVO;

import javax.ws.rs.Consumes;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("task/complete")
public class TaskCompleteWrapper {

    private DatabaseConfig dc;
    private TaskService ts;

    public TaskCompleteWrapper(){
        System.out.println("In Task Complete Wrapper Constructor");
        dc = new DatabaseConfig();
        ts = new TaskService(dc.openConnection());
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public ResultObjectVO updateTask(TaskVO task){
        return ts.completeTask (task.getTaskID(), task.isCompleted());
    }

}
