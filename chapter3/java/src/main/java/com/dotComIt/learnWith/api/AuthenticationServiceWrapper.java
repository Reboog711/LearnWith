package com.dotComIt.learnWith.api;


import com.dotComIt.learnWith.config.DatabaseConfig;
import com.dotComIt.learnWith.services.AuthenticationService;
import com.dotComIt.learnWith.vos.ResultObjectVO;
import com.dotComIt.learnWith.vos.UserVO;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("login")
public class AuthenticationServiceWrapper {

    private DatabaseConfig dc;
    private AuthenticationService as;

    public AuthenticationServiceWrapper(){
        System.out.println("In Authentication Service Wrapper Constructor");
        dc = new DatabaseConfig();
        as = new AuthenticationService(dc.openConnection());
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public ResultObjectVO login(UserVO user){
        System.out.println(user.getPassword());
        System.out.println(user.getUsername());
        return as.authenticate(user.getUsername(), user.getPassword());
    }


}
