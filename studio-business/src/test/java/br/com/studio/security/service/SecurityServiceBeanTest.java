package br.com.studio.security.service;

import static org.mockito.Mockito.when;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import br.org.studio.context.UserDataContext;
import br.org.studio.dao.UserDao;
import br.org.studio.entities.system.User;
import br.org.studio.exception.EmailNotFoundException;
import br.org.studio.exception.InvalidPasswordException;
import br.org.studio.exceptions.DataNotFoundException;
import br.org.studio.rest.dtos.LoginAuthenticationDto;
import br.org.studio.security.SecurityServiceBean;

@RunWith(MockitoJUnitRunner.class)
public class SecurityServiceBeanTest {

	private static final String EMAIL = "joao.silva@hotmail.com";
	private static final String PASSWORD = "password";

	@InjectMocks
	private SecurityServiceBean service = new SecurityServiceBean();

	@Mock
	private UserDao userDao;
	@Mock
	private LoginAuthenticationDto loginDto;
	@Mock
	private UserDataContext userDataContext;
	@Mock
	private User user;

	@Test
	public void authentication_login_with_data() throws InvalidPasswordException, EmailNotFoundException, DataNotFoundException {
		Mockito.when(userDao.fetchByEmail(EMAIL)).thenReturn(user);
		Mockito.when(user.getPassword()).thenReturn(PASSWORD);

		LoginAuthenticationDto loginAuthentication = new LoginAuthenticationDto(EMAIL, PASSWORD);
		service.authenticate(loginAuthentication);

		Mockito.verify(userDataContext).login(user);
	}

	@SuppressWarnings("unchecked")
	@Test(expected = EmailNotFoundException.class)
	public void authentication_login_email_invalid() throws InvalidPasswordException, EmailNotFoundException, DataNotFoundException {
		when(userDao.fetchByEmail(EMAIL)).thenThrow(EmailNotFoundException.class);

		LoginAuthenticationDto loginAuthentication = new LoginAuthenticationDto(EMAIL, PASSWORD);
		service.authenticate(loginAuthentication);
	}

	@SuppressWarnings("unchecked")
	@Test(expected = InvalidPasswordException.class)
	public void authentication_login_password_invalid() throws DataNotFoundException, InvalidPasswordException, EmailNotFoundException{
		Mockito.when(userDao.fetchByEmail(EMAIL)).thenReturn(user);
		when(user.getPassword()).thenThrow(InvalidPasswordException.class);
		
		LoginAuthenticationDto loginAuthentication = new LoginAuthenticationDto(EMAIL, PASSWORD);
		service.authenticate(loginAuthentication);
		
	}

}