package br.org.studio.rest;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import br.org.studio.exception.RepositoryNotFoundException;
import br.org.studio.repository.RepositoryService;
import br.org.studio.rest.dtos.repository.RepositoryDto;

import com.google.gson.Gson;

@Path("repository")
public class RepositoryResource {

    @Inject
    private RepositoryService repositoryService;
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<RepositoryDto> getAll() {
    	List<RepositoryDto> repositories = null;
    	try {
			repositories = repositoryService.fetchAll();
		} catch (RepositoryNotFoundException e) {
			e.printStackTrace();
		}
		return repositories;
    }
    
    @POST
    @Path("/connectionStatus")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String getConnectionStatus(String repository) {
        RepositoryDto convertedRepositoryDto = new Gson().fromJson(repository, RepositoryDto.class);
        Response response = new Response();

        response.setData(repositoryService.isServerRepositoryAccessible(convertedRepositoryDto));
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
    @Path("/connect")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String connect(String repository) {
        Response response = new Response();
        RepositoryDto convertedRepositoryDto = new Gson().fromJson(repository, RepositoryDto.class);

        try {
            repositoryService.connect(convertedRepositoryDto);
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
