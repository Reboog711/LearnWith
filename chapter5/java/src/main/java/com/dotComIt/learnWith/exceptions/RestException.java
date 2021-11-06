package com.dotComIt.learnWith.exceptions;

import com.dotComIt.learnWith.vos.RestExceptionVO;
import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status;

public class RestException extends WebApplicationException {
    public RestException(RestExceptionVO message, Status status) {
        super(Response.status(status).entity(message).type(MediaType.APPLICATION_JSON).build());
    }
}
