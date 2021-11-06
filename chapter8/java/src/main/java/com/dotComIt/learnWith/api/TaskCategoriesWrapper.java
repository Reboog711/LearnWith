package com.dotComIt.learnWith.api;

import com.dotComIt.learnWith.config.DatabaseConfig;
import com.dotComIt.learnWith.services.TaskCategoriesService;
import com.dotComIt.learnWith.vos.TaskCategoryVO;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import java.util.ArrayList;

@Path("taskcategories")
public class TaskCategoriesWrapper {
    private DatabaseConfig dc;
    private TaskCategoriesService ts;
    public TaskCategoriesWrapper(){
        dc = new DatabaseConfig();
        ts = new TaskCategoriesService(dc.openConnection());
    }
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public ArrayList<TaskCategoryVO> getTaskCategories(){
        return ts.getTaskCategories();
    }
}
