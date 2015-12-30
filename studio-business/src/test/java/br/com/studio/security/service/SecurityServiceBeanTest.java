package br.com.studio.security.service;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import javax.servlet.http.HttpSession;

import br.org.studio.context.ContextService;
import br.org.studio.exception.SessionNotFoundException;
import br.org.studio.exception.UserDisabledException;
import br.org.studio.rest.dtos.UserDto;
import org.junit.Assert;
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
    private ContextService contextService;
    @Mock
    private User user;
    @Mock
    private HttpSession httpSession;

    @Test
    public void authentication_login_with_data() throws InvalidPasswordException, EmailNotFoundException, DataNotFoundException, UserDisabledException {
        Mockito.when(userDao.fetchByEmail(EMAIL)).thenReturn(user);
        Mockito.when(user.getPassword()).thenReturn(PASSWORD);
        Mockito.when(user.isEnable()).thenReturn(true);

        LoginAuthenticationDto loginAuthentication = new LoginAuthenticationDto(EMAIL, PASSWORD, httpSession);
        service.authenticate(loginAuthentication);

        Mockito.verify(userDataContext).login(httpSession, user);
    }

    @SuppressWarnings("unchecked")
    @Test(expected = UserDisabledException.class)
    public void authentication_should_invalid_with_user_isDisabled() throws EmailNotFoundException, InvalidPasswordException, DataNotFoundException, UserDisabledException {
        Mockito.when(userDao.fetchByEmail(EMAIL)).thenReturn(user);
        Mockito.when(user.getPassword()).thenReturn(PASSWORD);
        Mockito.when(user.isEnable()).thenReturn(false);

        LoginAuthenticationDto loginAuthentication = new LoginAuthenticationDto(EMAIL, PASSWORD, httpSession);
        service.authenticate(loginAuthentication);
    }

    @SuppressWarnings("unchecked")
    @Test(expected = EmailNotFoundException.class)
    public void authentication_login_email_invalid() throws InvalidPasswordException, EmailNotFoundException, DataNotFoundException, UserDisabledException {
        when(userDao.fetchByEmail(EMAIL)).thenThrow(EmailNotFoundException.class);

        LoginAuthenticationDto loginAuthentication = new LoginAuthenticationDto(EMAIL, PASSWORD, httpSession);
        service.authenticate(loginAuthentication);
    }

    @Test(expected = InvalidPasswordException.class)
    public void authentication_login_password_invalid() throws DataNotFoundException, InvalidPasswordException, EmailNotFoundException, UserDisabledException {
        String invalidPassword = "INVALID";

        Mockito.when(userDao.fetchByEmail(EMAIL)).thenReturn(user);
        Mockito.when(user.getPassword()).thenReturn(invalidPassword);

        LoginAuthenticationDto loginAuthentication = new LoginAuthenticationDto(EMAIL, PASSWORD, httpSession);
        service.authenticate(loginAuthentication);
    }

    @Test
    public void isLogged_should_return_TRUE_when_the_user_exists() throws SessionNotFoundException {
        when(contextService.getLoggedUser(httpSession)).thenReturn(new UserDto());
        Assert.assertTrue(service.isLogged(httpSession));
    }

    @Test
    public void isLogged_should_return_FALSE_when_the_user_dont_exists() throws SessionNotFoundException {
        when(contextService.getLoggedUser(httpSession)).thenThrow(SessionNotFoundException.class);
        Assert.assertFalse(service.isLogged(httpSession));
    }

    @Test
    public void method_logout_should_call_logout_in_userDataContext(){
        service.logout(httpSession);
        verify(userDataContext).logout(httpSession);
    }
}