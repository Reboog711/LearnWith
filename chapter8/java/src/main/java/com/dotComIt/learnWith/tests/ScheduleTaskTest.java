package com.dotComIt.learnWith.tests;

import com.dotComIt.learnWith.config.DatabaseConfig;
import com.dotComIt.learnWith.services.TaskService;
import com.dotComIt.learnWith.vos.ResultObjectVO;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.time.LocalDate;

@Path("test/scheduleTask")
public class ScheduleTaskTest {
    private DatabaseConfig dc;
    private TaskService ts;

    public ScheduleTaskTest(){
        System.out.println("In Get Filtered Tasks Test Constructor");
        dc = new DatabaseConfig();
        ts = new TaskService(dc.openConnection());
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public ResultObjectVO scheduleTask() {
        return ts.scheduleTask(1, LocalDate.now());
    }
}
