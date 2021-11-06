package com.dotComIt.learnWith.api;

import com.dotComIt.learnWith.config.DatabaseConfig;
import com.dotComIt.learnWith.services.AuthenticationService;
import com.dotComIt.learnWith.vos.UserVO;
import jakarta.ws.rs.Path;

import jakarta.ws.rs.POST;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import com.dotComIt.learnWith.exceptions.RestException;
import com.dotComIt.learnWith.vos.RestExceptionVO;
import jakarta.ws.rs.core.Response;

@Path("user/login")
public class AuthenticationServiceWrapper {
    private DatabaseConfig dc;
    private AuthenticationService as;
    public AuthenticationServiceWrapper(){
        dc = new DatabaseConfig();
        as = new AuthenticationService(dc.openConnection());
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public UserVO login(UserVO user){
        UserVO result = as.authenticate(user.getUsername(), user.getPassword());
        if (result == null) {
            System.out.println("No Result");
            // todo throw rest exception here
            RestExceptionVO restException = new RestExceptionVO();
            restException.setMessage("User Not Authorized");
            throw new RestException(restException, Response.Status.UNAUTHORIZED);
        }
        System.out.println(result.toString());
        return result;
    }

}
