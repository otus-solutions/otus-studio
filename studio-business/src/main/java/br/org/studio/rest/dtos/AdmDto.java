package br.org.studio.rest.dtos;

import br.org.studio.security.EncryptorResources;
import br.org.tutty.Equalization;

import java.io.Serializable;

public class AdmDto implements Serializable{

	private static final long serialVersionUID = -5851680952577534837L;

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
	
	public void encrypt(){
		this.password = EncryptorResources.encrypt(password);
	}
}
