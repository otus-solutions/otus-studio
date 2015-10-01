package br.org.studio.rest;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import br.org.studio.configuration.SystemConfigService;
import br.org.studio.rest.dtos.AdmDto;

import com.google.gson.Gson;

@Path("/register")
public class UserResouce {

	@Inject
	private SystemConfigService systemConfigService;

	@POST
	@Path("/adm")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void addAdm(String userJSon) {
		Gson gson = new Gson();
		AdmDto admDto = gson.fromJson(userJSon, AdmDto.class);

		systemConfigService.createAdmin(admDto);
	}

}
