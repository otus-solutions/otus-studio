package br.org.studio.rest;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.google.gson.Gson;

import br.org.studio.configuration.SystemConfigService;
import br.org.studio.rest.dtos.SystemConfigDto;

@Path("/system")
public class SystemConfigResource {
	
	@Inject
	private SystemConfigService systemConfigService;
	
	@POST
	@Path("/config")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public String systemConfig(String systemConfigJSon) {
		SystemConfigDto systemConfigDto = new Gson().fromJson(systemConfigJSon, SystemConfigDto.class);
		
		try {
			systemConfigDto.getUserDto().encrypt();
			systemConfigService.createInitialSystemConfig(systemConfigDto);
			return new Gson().toJson(Boolean.TRUE);
			
		} catch (Exception e) {
			return new Gson().toJson(Boolean.FALSE);
		}
	}
}
