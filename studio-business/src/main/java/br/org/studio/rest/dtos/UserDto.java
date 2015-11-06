package br.org.studio.rest.dtos;

import br.org.studio.security.EncryptorResources;
import br.org.tutty.Equalization;

import java.io.Serializable;

public class UserDto implements Serializable {

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

  	@Equalization(name = "admin_flag")
    	private Boolean admin;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void encrypt() {
		this.password = EncryptorResources.encrypt(password);
	}
}
