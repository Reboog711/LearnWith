package com.dotComIt.learnWith.api;

import com.dotComIt.learnWith.config.DatabaseConfig;
import com.dotComIt.learnWith.services.TaskService;
import com.dotComIt.learnWith.vos.ResultObjectVO;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("taskCategories")
public class TaskCategoriesWrapper {

    private DatabaseConfig dc;
    private TaskService ts;

    public TaskCategoriesWrapper(){
        System.out.println("In Task Services getCategories Wrapper Constructor");
        dc = new DatabaseConfig();
        ts = new TaskService(dc.openConnection());
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public ResultObjectVO getTaskCategories(){
        return ts.getTaskCategories();
    }

}
