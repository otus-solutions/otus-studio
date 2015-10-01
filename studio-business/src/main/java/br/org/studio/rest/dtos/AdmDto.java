package br.org.studio.rest.dtos;

import br.org.tutty.Equalization;

public class AdmDto {
	@Equalization(name = "name")
	private String name;

	@Equalization(name = "last_name")
	private String last_name;

	@Equalization(name = "phone")
	private String phone;

	@Equalization(name = "email")
	private String email;

	@Equalization(name = "password")
	private String password;
}
