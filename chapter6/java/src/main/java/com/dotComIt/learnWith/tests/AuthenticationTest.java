package com.dotComIt.learnWith.tests;


import com.dotComIt.learnWith.config.DatabaseConfig;
import com.dotComIt.learnWith.services.AuthenticationService;
import com.dotComIt.learnWith.vos.ResultObjectVO;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("test/login")
public class AuthenticationTest {

    private DatabaseConfig dc;
    private AuthenticationService as;

    public AuthenticationTest(){
        System.out.println("In Authentication Test Constructor");
        dc = new DatabaseConfig();
        as = new AuthenticationService(dc.openConnection());
    }

    // get method for success
    @GET
    @Path("success")
    @Produces(MediaType.APPLICATION_JSON)
    public ResultObjectVO loadUserSuccess() {
        return as.authenticate("me","AB86A1E1EF70DFF97959067B723C5C24");
    }


    // get method for failure
    @GET
    @Path("fail")
    @Produces(MediaType.APPLICATION_JSON)
    public ResultObjectVO loadUserFail() {
        // non hashed password so should fail
        return as.authenticate("me","me");
    }
}
