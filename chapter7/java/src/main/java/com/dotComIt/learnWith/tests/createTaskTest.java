package com.dotComIt.learnWith.tests;

import com.dotComIt.learnWith.config.DatabaseConfig;
import com.dotComIt.learnWith.services.TaskService;
import com.dotComIt.learnWith.vos.ResultObjectVO;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("test/create")
public class createTaskTest {

    private DatabaseConfig dc;
    private TaskService ts;

    public createTaskTest(){
        System.out.println("In Create Task Test Constructor");
        dc = new DatabaseConfig();
        ts = new TaskService(dc.openConnection());
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public ResultObjectVO createTask() {
        return ts.createTask(1,1,"Created by Java Test Harness");
    }

}
