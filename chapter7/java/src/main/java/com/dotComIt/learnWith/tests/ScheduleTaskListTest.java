package com.dotComIt.learnWith.tests;

import com.dotComIt.learnWith.config.DatabaseConfig;
import com.dotComIt.learnWith.services.TaskService;
import com.dotComIt.learnWith.vos.ResultObjectVO;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.time.LocalDate;

@Path("test/scheduleTaskList")
public class ScheduleTaskListTest {
    private DatabaseConfig dc;
    private TaskService ts;

    public ScheduleTaskListTest(){
        System.out.println("In Get Filtered Tasks Test Constructor");
        dc = new DatabaseConfig();
        ts = new TaskService(dc.openConnection());
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public ResultObjectVO scheduleTaskList() {
        return ts.scheduleTaskList("1,2,3", LocalDate.now());
    }
}
