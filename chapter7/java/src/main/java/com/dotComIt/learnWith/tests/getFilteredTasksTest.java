package com.dotComIt.learnWith.tests;


import com.dotComIt.learnWith.config.DatabaseConfig;
import com.dotComIt.learnWith.services.TaskService;
import com.dotComIt.learnWith.vos.ResultObjectVO;
import com.dotComIt.learnWith.vos.TaskFilterVO;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.time.LocalDate;

@Path("test/tasks")
public class getFilteredTasksTest {

    private DatabaseConfig dc;
    private TaskService ts;

    public getFilteredTasksTest(){
        System.out.println("In Get Filtered Tasks Test Constructor");
        dc = new DatabaseConfig();
        ts = new TaskService(dc.openConnection());
    }

    // get method for getting not completed tasks
    @GET
    @Path("notCompleted")
    @Produces(MediaType.APPLICATION_JSON)
    public ResultObjectVO getNotCompletedTasks() {
        TaskFilterVO filter = new TaskFilterVO();
        filter.setCompleted(false);
        return ts.getFilteredTasks(filter);
    }

    // get method for getting completed tasks
    @GET
    @Path("completed")
    @Produces(MediaType.APPLICATION_JSON)
    public ResultObjectVO getCompletedTasks() {
        TaskFilterVO filter = new TaskFilterVO();
        filter.setCompleted(true);
        return ts.getFilteredTasks(filter);
    }

    // get method for getting completed tasks
    @GET
    @Path("afterStartDate")
    @Produces(MediaType.APPLICATION_JSON)
    public ResultObjectVO getAfterStartDateTasks() {
        TaskFilterVO filter = new TaskFilterVO();
        filter.setStartDate(LocalDate.parse("2017-03-28"));
        return ts.getFilteredTasks(filter);
    }

}
