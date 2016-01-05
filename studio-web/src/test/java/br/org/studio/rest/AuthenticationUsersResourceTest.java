package br.org.studio.rest;

import br.org.studio.exception.EmailNotFoundException;
import br.org.studio.exception.InvalidPasswordException;
import br.org.studio.exception.UserDisabledException;
import br.org.studio.rest.dtos.LoginAuthenticationDto;
import br.org.studio.security.SecurityServiceBean;
import com.google.gson.Gson;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Matchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import javax.servlet.http.HttpSession;

@RunWith(MockitoJUnitRunner.class)
public class AuthenticationUsersResourceTest {
    private static final String EMAIL_INVALID = "email";
    private static final String PASSWORD_INVALID = "password";

    @InjectMocks
    private AuthenticationResource authenticationResource;

    @Mock
    private SecurityServiceBean securityServiceBean;

    @Test
    public void userLogin_shold_return_FALSE_when_throw_any_exception() throws EmailNotFoundException, InvalidPasswordException, UserDisabledException {
        Mockito.doThrow(new EmailNotFoundException()).when(securityServiceBean).authenticate(Matchers.any(LoginAuthenticationDto.class));

        LoginAuthenticationDto loginAuthenticationDto = new LoginAuthenticationDto();
        loginAuthenticationDto.setEmail(EMAIL_INVALID);
        loginAuthenticationDto.setPassword(PASSWORD_INVALID);

        loginAuthenticationDto.encryptPassword();

        String result = authenticationResource.userLogin(new Gson().toJson(loginAuthenticationDto));

        Assert.assertEquals(Boolean.FALSE, new Gson().fromJson(result, Boolean.class));
    }

    @Test
    public void userLogin_should_return_TRUE_when_dont_throw_any_exception(){
        LoginAuthenticationDto loginAuthenticationDto = new LoginAuthenticationDto();
        loginAuthenticationDto.setEmail(EMAIL_INVALID);
        loginAuthenticationDto.setPassword(PASSWORD_INVALID);

        loginAuthenticationDto.encryptPassword();

        String result = authenticationResource.userLogin(new Gson().toJson(loginAuthenticationDto));

        Assert.assertEquals(Boolean.TRUE, new Gson().fromJson(result, Boolean.class));
    }

    @Test
    public void isLogged_should_return_TRUE_when_user_is_authenticated(){
        Mockito.when(securityServiceBean.isLogged(Matchers.any(HttpSession.class))).thenReturn(Boolean.TRUE);

        String result = authenticationResource.isLogged();

        Assert.assertEquals(Boolean.TRUE, new Gson().fromJson(result, Response.class).getData());
    }

    @Test
    public void isLogged_should_return_FALSE_when_user_is_dont_authenticated(){
        Mockito.when(securityServiceBean.isLogged(Matchers.any(HttpSession.class))).thenReturn(Boolean.FALSE);

        String result = authenticationResource.isLogged();

        Assert.assertEquals(Boolean.FALSE, new Gson().fromJson(result, Response.class).getData());
    }
}
