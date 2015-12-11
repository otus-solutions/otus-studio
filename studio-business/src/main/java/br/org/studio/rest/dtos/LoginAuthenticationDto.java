package br.org.studio.rest.dtos;

import java.io.Serializable;

import javax.servlet.http.HttpSession;

import br.org.studio.security.EncryptorResources;
import br.org.tutty.Equalization;

public class LoginAuthenticationDto implements Serializable {

	private static final long serialVersionUID = 7577651923731847238L;

	@Equalization(name = "email")
	private String email;

	@Equalization(name = "password")
	private String password;
	
	private HttpSession httpSession;
	
	public LoginAuthenticationDto() {
		super();
	}

	public LoginAuthenticationDto(String email, String password, HttpSession httpSession) {
		super();
		this.email = email;
		this.password = password;
		this.httpSession = httpSession;
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
	
	public void setEmail(String email){
		this.email = email;
	}
	
	public void setPassword(String password){
		this.password = password;
	}

	public HttpSession getHttpSession() {
		return httpSession;
	}

	public void setHttpSession(HttpSession httpSession) {
		this.httpSession = httpSession;
	}			
}
