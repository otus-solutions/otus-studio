package br.org.studio.rest;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import br.org.studio.configuration.SystemConfigService;
import br.org.studio.exception.FillUserExceltion;
import br.org.studio.messages.FillUserExcetionMessage;
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
	public String addAdm(String userJSon) {
		Gson gson = new Gson();

		try {
			AdmDto admDto = gson.fromJson(userJSon, AdmDto.class);
			admDto.encrypt();

			systemConfigService.createAdmin(admDto);
			return gson.toJson(new FillUserExcetionMessage());

		} catch (FillUserExceltion e) {
			return gson.toJson(new FillUserExcetionMessage());
		}
	}
}
