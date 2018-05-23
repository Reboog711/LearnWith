package com.dotComIt.learnWith.tests;

import com.dotComIt.learnWith.config.DatabaseConfig;
import com.dotComIt.learnWith.services.TaskService;
import com.dotComIt.learnWith.vos.ResultObjectVO;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("test/update")
public class updateTaskTest {

    private DatabaseConfig dc;
    private TaskService ts;

    public updateTaskTest(){
        System.out.println("In Update Task Test Constructor");
        dc = new DatabaseConfig();
        ts = new TaskService(dc.openConnection());
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public ResultObjectVO updateTask() {
        return ts.updateTask(1,2,"Updated by Java Test Harness");
    }


}
