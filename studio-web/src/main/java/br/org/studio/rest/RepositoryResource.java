package br.org.studio.rest;

import br.org.studio.exception.RepositoryNotFoundException;
import br.org.studio.exception.RepositoryOfflineException;
import br.org.studio.repository.RepositoryService;
import br.org.studio.rest.dtos.repository.RepositoryDto;
import com.google.gson.Gson;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("repository")
public class RepositoryResource {

    @Inject
    private RepositoryService repositoryService;

    @POST
    @Path("/connectionStatus")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String getConnectionStatus(String repository) {
        RepositoryDto convertedRepositoryDto = new Gson().fromJson(repository, RepositoryDto.class);
        Response response = new Response();

        response.setData(repositoryService.validateConnection(convertedRepositoryDto));
        return response.toJson();
    }

    @GET
    @Path("get")
    @Produces(MediaType.APPLICATION_JSON)
    public String existRepository(@QueryParam("repositoryName") String repositoryName) {
        Response response = new Response();
        List<RepositoryDto> repositories = null;

        try {
            repositories = repositoryService.fetchRepository(repositoryName);
            response.setData(repositories);

        } catch (RepositoryNotFoundException e) {
            response.setError(e);
        }

        return response.toJson();
    }


    @POST
    @Path("/add")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String add(String repository) {
        Response response = new Response();
        RepositoryDto convertedRepositoryDto = new Gson().fromJson(repository, RepositoryDto.class);

        try {
            repositoryService.add(convertedRepositoryDto);
            response.setData(Boolean.TRUE);
        } catch (Exception e) {
            response.setError(e);
        }

        return response.toJson();
    }

    @POST
    @Path("/create")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String create(String repository) {
        Response response = new Response();
        RepositoryDto convertedRepositoryDto = new Gson().fromJson(repository, RepositoryDto.class);

        try {
            repositoryService.create(convertedRepositoryDto);
            response.setData(Boolean.TRUE);

        } catch (Exception e) {
            response.setError(e);
        }

        return response.toJson();
    }
}
