package com.dotComIt.learnWith.tests;


import com.dotComIt.learnWith.config.DatabaseConfig;
import com.dotComIt.learnWith.services.TaskService;
import com.dotComIt.learnWith.vos.ResultObjectVO;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("test/taskCategories")
public class getTaskCategoriesTest {

    private DatabaseConfig dc;
    private TaskService ts;

    public getTaskCategoriesTest(){
        dc = new DatabaseConfig();
        ts = new TaskService(dc.openConnection());
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public ResultObjectVO getTaskCategories() {
        return ts.getTaskCategories();
    }
}
