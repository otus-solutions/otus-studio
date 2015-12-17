package br.org.studio.context;

import static org.junit.Assert.assertEquals;

import javax.servlet.http.HttpSession;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import br.org.studio.entities.system.User;
import br.org.studio.exceptions.DataNotFoundException;

@RunWith(MockitoJUnitRunner.class)
public class UserDataContextTest {

	@Mock
	private User user;
	@Mock
	private HttpSession session;

	private UserDataContext userDataContext;

	@Before
	public void setUp() {
        userDataContext = new UserDataContext();
        userDataContext.setUp();
	}

	@Test
	public void method_getLoggedUser_should_return_a_logged_user() throws DataNotFoundException{
        userDataContext.login(session, user);

		assertEquals(user, userDataContext.getLoggedUser(session));
	}

	@Test(expected = DataNotFoundException.class)
	public void method_getLoggedUser_should_trowns_a_DataNotFoundException_when_not_exists_a_logged_user() throws DataNotFoundException{
		userDataContext.getLoggedUser(session);
	}
}