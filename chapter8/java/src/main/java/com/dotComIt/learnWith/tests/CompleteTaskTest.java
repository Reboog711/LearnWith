package com.dotComIt.learnWith.tests;

import com.dotComIt.learnWith.config.DatabaseConfig;
import com.dotComIt.learnWith.services.TaskService;
import com.dotComIt.learnWith.vos.ResultObjectVO;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("test")
public class CompleteTaskTest {

    private DatabaseConfig dc;
    private TaskService ts;

    public CompleteTaskTest(){
        System.out.println("In Get Filtered Tasks Test Constructor");
        dc = new DatabaseConfig();
        ts = new TaskService(dc.openConnection());
    }

    @GET
    @Path("completeTask")
    @Produces(MediaType.APPLICATION_JSON)
    public ResultObjectVO completeTask() {
        return ts.completeTask(1,true);
    }

    @GET
    @Path("notCompleteTask")
    @Produces(MediaType.APPLICATION_JSON)
    public ResultObjectVO notCompleteTask() {
        return ts.completeTask(1,false);
    }

}
