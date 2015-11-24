package br.org.studio.rest;

import br.org.studio.administration.AdministrationUserService;
import br.org.studio.rest.dtos.UserDto;
import br.org.studio.rest.dtos.administration.AdministrationUser;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.lang.reflect.Type;
import java.util.List;

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
        Type collectionType = new TypeToken<List<UserDto>>(){}.getType();
        List<UserDto> convertedUsers = new Gson().fromJson(users, collectionType);

        administrationUserService.disableUsers(convertedUsers);
        Response response = new Response();
        response.setData(Boolean.TRUE);
        return response.toJson();
       
    }

    @POST
    @Path("/enable")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public String enableUsers(String users) {
        Type collectionType = new TypeToken<List<UserDto>>(){}.getType();
        List<UserDto> convertedUsers = new Gson().fromJson(users, collectionType);

        administrationUserService.enableUsers(convertedUsers);
        Response response = new Response();
        response.setData(Boolean.TRUE);
        return response.toJson();
    }
}
