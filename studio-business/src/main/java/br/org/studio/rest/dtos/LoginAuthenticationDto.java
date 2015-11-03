package br.org.studio.rest.dtos;

import java.io.Serializable;

import br.org.studio.security.EncryptorResources;
import br.org.tutty.Equalization;

public class LoginAuthenticationDto implements Serializable {

	private static final long serialVersionUID = 7577651923731847238L;

	@Equalization(name = "email")
	private String email;

	@Equalization(name = "password")
	private String password;
	
	public LoginAuthenticationDto() {
		super();
	}

	public LoginAuthenticationDto(String email, String password) {
		super();
		this.email = email;
		this.password = password;
	}

	public void encryptPassword() {
		this.password = EncryptorResources.encrypt(password);
	}

	public String getEmail() {
		return email;
	}

	public String getPassword() {
		return password;
	}

}
