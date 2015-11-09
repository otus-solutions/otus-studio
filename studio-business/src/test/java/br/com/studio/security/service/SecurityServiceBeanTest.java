package br.com.studio.security.service;

import br.org.studio.context.UserDataContext;
import br.org.studio.dao.UserDao;
import br.org.studio.entities.system.User;
import br.org.studio.exception.EmailNotFoundException;
import br.org.studio.exception.InvalidPasswordException;
import br.org.studio.exceptions.DataNotFoundException;
import br.org.studio.rest.dtos.LoginAuthenticationDto;
import br.org.studio.security.SecurityServiceBean;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import javax.xml.crypto.Data;

import static org.mockito.Mockito.when;

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
        Mockito.when(user.isEnable()).thenReturn(true);

		LoginAuthenticationDto loginAuthentication = new LoginAuthenticationDto(EMAIL, PASSWORD);
		service.authenticate(loginAuthentication);

		Mockito.verify(userDataContext).login(user);
	}

    @Test(expected = EmailNotFoundException.class)
    public void authentication_should_invalid_with_user_isDisabled() throws EmailNotFoundException, InvalidPasswordException, DataNotFoundException {
        Mockito.when(userDao.fetchByEmail(EMAIL)).thenReturn(user);
        Mockito.when(userDao.fetchByEmail(EMAIL)).thenThrow(DataNotFoundException.class);

        LoginAuthenticationDto loginAuthentication = new LoginAuthenticationDto(EMAIL, PASSWORD);
        service.authenticate(loginAuthentication);

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
        String invalidPassword = "INVALID";

		Mockito.when(userDao.fetchByEmail(EMAIL)).thenReturn(user);
        Mockito.when(user.getPassword()).thenReturn(invalidPassword);

		LoginAuthenticationDto loginAuthentication = new LoginAuthenticationDto(EMAIL, PASSWORD);
		service.authenticate(loginAuthentication);

	}

}