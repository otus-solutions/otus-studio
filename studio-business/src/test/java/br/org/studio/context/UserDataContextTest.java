package br.org.studio.context;

import javax.servlet.http.HttpSession;

import org.junit.Assert;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Matchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import br.org.studio.entities.system.User;
import br.org.studio.exceptions.DataNotFoundException;
@RunWith(MockitoJUnitRunner.class)
public class UserDataContextTest {
	
	@Mock
	private HttpSession httpSession;
	
	@Mock
	private UserDataContext userDataContext;

	@Ignore
	@Test
	public void method_login_should_put_a_user_in_map() throws DataNotFoundException{
		//TODO 
		Mockito.when(httpSession.equals(Matchers.any())).thenReturn(true); 
		
		User user = new User();
		userDataContext.login(httpSession, user);
		Assert.assertEquals(user, userDataContext.getLoggedUser(httpSession));
	}
	
}