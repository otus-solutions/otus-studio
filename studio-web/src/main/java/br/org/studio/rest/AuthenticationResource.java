package br.org.studio.rest;

import javax.inject.Inject;
import javax.servlet.http.HttpSession;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import br.org.studio.rest.dtos.LoginAuthenticationDto;
import br.org.studio.security.SecurityService;

import com.google.gson.Gson;

@Path("authentication")
public class AuthenticationResource {

    @Inject
    private SecurityService securityService;
    @Inject
    private HttpSession httpSession;

    @Path("/login")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String userLogin(String loginData) {
        Gson gson = new Gson();

        LoginAuthenticationDto loginDto = gson.fromJson(loginData, LoginAuthenticationDto.class);
        loginDto.setHttpSession(httpSession);
        loginDto.encryptPassword();

        try {
            securityService.authenticate(loginDto);

            return gson.toJson(Boolean.TRUE);

        } catch (Exception e) {
            return gson.toJson(Boolean.FALSE);
        }
    }

    @Path("/logout")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public String userLogout() {
        Response response = new Response();

        try {
            securityService.logout(httpSession);
            response.setData(Boolean.TRUE);
        } catch (Exception e) {
            response.setData(Boolean.FALSE);
        }

        return response.toJson();

    }

    @Path("/isLogged")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String isLogged() {
        Response response = new Response();
        response.setData(securityService.isLogged(httpSession));

        return response.toJson();
    }
}
