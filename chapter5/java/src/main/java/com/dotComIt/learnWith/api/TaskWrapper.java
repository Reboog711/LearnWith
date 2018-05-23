package com.dotComIt.learnWith.api;

import com.dotComIt.learnWith.config.DatabaseConfig;
import com.dotComIt.learnWith.services.TaskService;
import com.dotComIt.learnWith.vos.ResultObjectVO;
import com.dotComIt.learnWith.vos.TaskVO;
import com.dotComIt.learnWith.vos.UserVO;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("task")
public class TaskWrapper {

    private DatabaseConfig dc;
    private TaskService ts;

    public TaskWrapper(){
        System.out.println("In Task Service Wrapper Constructor");
        dc = new DatabaseConfig();
        ts = new TaskService(dc.openConnection());
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public ResultObjectVO createTask(TaskVO task){
        return ts.createTask(task.getTaskCategoryID(), task.getUserID(), task.getDescription() );
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public ResultObjectVO updateTask(TaskVO task){
        return ts.updateTask(task.getTaskID(), task.getTaskCategoryID(), task.getDescription() );
    }

}
