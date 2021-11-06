package com.dotComIt.learnWith.api;

import com.dotComIt.learnWith.config.DatabaseConfig;
import com.dotComIt.learnWith.exceptions.RestException;
import com.dotComIt.learnWith.services.TaskService;
import com.dotComIt.learnWith.vos.RestExceptionVO;
import com.dotComIt.learnWith.vos.TaskVO;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("task")
public class TaskWrapper {
    private DatabaseConfig dc;
    private TaskService ts;

    public TaskWrapper(){
        dc = new DatabaseConfig();
        ts = new TaskService(dc.openConnection());
    }

    @GET
    @Path("/{taskID}")
    @Produces(MediaType.APPLICATION_JSON)
    public TaskVO loadTask(@PathParam("taskID") int taskID){
        System.out.println("in the loadTask() method");
        System.out.println(String.valueOf(taskID));

        TaskVO results = ts.loadTask(taskID);
        System.out.println(results);
        if (results == null) {
            RestExceptionVO restException = new RestExceptionVO();
            restException.setMessage("Error loading task");
            throw new RestException(restException, Response.Status.NOT_FOUND);
        }
        return results;
    }


    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public TaskVO createTask(TaskVO task){
        TaskVO results = ts.createTask(task );
        if (results == null) {
            RestExceptionVO restException = new RestExceptionVO();
            restException.setMessage("Error Creating Task");
            // todo fix this in book
            throw new RestException(restException, Response.Status.INTERNAL_SERVER_ERROR);
        }
        return results;
    }

    @PUT
    @Path("/{taskID}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public TaskVO updateTask(TaskVO task, @PathParam("taskID") int taskID){
        TaskVO results = ts.updateTask(task, taskID);
        if (results == null) {
            RestExceptionVO restException = new RestExceptionVO();
            restException.setMessage("Error Updating Task");
            throw new RestException(restException, Response.Status.INTERNAL_SERVER_ERROR);
        }
        return results;
    }

}
