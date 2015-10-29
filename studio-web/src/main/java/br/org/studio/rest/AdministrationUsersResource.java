package br.org.studio.rest;

import br.org.studio.administration.AdministrationUserService;
import br.org.studio.rest.dtos.administration.AdministrationUser;
import com.google.gson.Gson;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

/**
 * Created by diogoferreira on 29/10/15.
 */
@Path("/administration/users")
public class AdministrationUsersResource {

    @Inject
    private AdministrationUserService administrationUserService;

    @GET
    @Path("/fetch")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String getUsers() {
        AdministrationUser administrationUser = administrationUserService.fetchUsers();
        return new Gson().toJson(administrationUser);
    }

    @POST
    @Path("/disable")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public String disableUsers(String users) {
        return new Gson().toJson(new Object());
    }

    @POST
    @Path("/disable")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public String enableUsers(String users) {
        return new Gson().toJson(new Object());
    }
}
