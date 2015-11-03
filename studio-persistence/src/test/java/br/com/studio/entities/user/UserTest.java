package br.com.studio.entities.user;

import static org.junit.Assert.assertEquals;

import java.util.List;

import javax.inject.Inject;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import br.org.studio.entities.system.User;

public class UserTest {

	@Inject
	private User user;

	@Before
	public void setup() {
		String name = "nameTest";
		String lastName = "lastNameTest";
		String phone = "phoneTest";
		String email = "emailTest";
		String password = "passwordTeste";
		user = new User(name, lastName, password, email, phone);
	}

	@Test
	public void returnIsExpectedNameEquals() {
		assertEquals("nameTest", user.getName());
	}

	@Test
	public void checkedIsAdm() {
		user.becomesAdm();
		assertEquals(true, user.getAdm());
	}

	@Test
	public void addedSetOfUsers() {
		int numberOfUsers = 5;
		List<User> listUsers = UserFixture.create(numberOfUsers);

		assertEquals("nameTest1", listUsers.get(1).getName());
	}

    @Test
    public void init_user_disable_and_without_adm_flag(){
        User user = new User();

        Assert.assertFalse(user.getAdm());
        Assert.assertFalse(user.isEnable());
    }
}
