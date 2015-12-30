package br.com.studio.context;

import br.org.studio.context.ContextServiceBean;
import br.org.studio.context.UserDataContext;
import br.org.studio.entities.system.User;
import br.org.studio.exception.SessionNotFoundException;
import br.org.studio.exceptions.DataNotFoundException;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import javax.servlet.http.HttpSession;

@RunWith(MockitoJUnitRunner.class)
public class ContextServiceBeanTest {

    @InjectMocks
    private ContextServiceBean contextServiceBean;

    @Mock
    private UserDataContext userDataContext;

    @Mock
    private User user;

    @Mock
    private HttpSession httpSession;

    @Test
    public void method_getLoggedUser_should_return_userDto_by_session() throws DataNotFoundException, SessionNotFoundException {
        Mockito.when(userDataContext.getLoggedUser(httpSession)).thenReturn(user);
        Assert.assertNotNull(contextServiceBean.getLoggedUser(httpSession));
    }

    @Test(expected = SessionNotFoundException.class)
    public void method_getLoggedUser_should_throw_SessionNotFoundException_when_not_found_session() throws DataNotFoundException, SessionNotFoundException {
        Mockito.when(userDataContext.getLoggedUser(httpSession)).thenThrow(DataNotFoundException.class);
        contextServiceBean.getLoggedUser(httpSession);
    }

    @Test
    public void method_remove_loggedUser_should_call_remove_in_userDataContext(){
        contextServiceBean.removeLoggedUser(httpSession);
        Mockito.verify(userDataContext).logout(httpSession);
    }
}
