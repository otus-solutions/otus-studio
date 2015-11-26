package br.com.studio.rest.dto.loginAuthentication;

import static org.junit.Assert.assertEquals;

import javax.servlet.http.HttpSession;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import br.org.studio.exception.EmailNotFoundException;
import br.org.studio.exception.InvalidPasswordException;
import br.org.studio.exceptions.DataNotFoundException;
import br.org.studio.rest.dtos.LoginAuthenticationDto;

@RunWith(MockitoJUnitRunner.class)
public class LoginAuthenticationTest {
	
	private static final String EMAIL = "joao.silveira@gmail.com";
	private static final String PASSWORD = "158927&";
	private static final String ENCRYPT_PASSWORD = "LXsrveNk8J7x7+t932NAERzKGFc=";

	private LoginAuthenticationDto login;
	@Mock
	private HttpSession httpSession;
	

	@Test
	public void encrypt_password_success() throws DataNotFoundException, InvalidPasswordException, EmailNotFoundException{
		login = new LoginAuthenticationDto(EMAIL, PASSWORD, httpSession);
		
		login.encryptPassword();
		
		assertEquals(ENCRYPT_PASSWORD, login.getPassword());	
	}
}
