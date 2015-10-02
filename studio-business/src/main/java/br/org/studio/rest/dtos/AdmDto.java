package br.org.studio.rest.dtos;

import br.org.tutty.Equalization;

import java.io.Serializable;

public class AdmDto implements Serializable{

	@Equalization(name = "name")
	private String name;

	@Equalization(name = "surname")
	private String surname;

	@Equalization(name = "phone")
	private String phone;

	@Equalization(name = "email")
	private String email;

	@Equalization(name = "password")
	private String password;
}
