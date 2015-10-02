package br.com.studio.entities.user;

import java.util.ArrayList;
import java.util.List;

import br.org.studio.entities.system.User;

public class UserFixture {

	private static User user;

	public static User create(String nameTest, String lastNameTest, String passwordTest, String emailTest, String phoneTest) {
		user = new User(nameTest, lastNameTest, passwordTest, emailTest, phoneTest);
		return user;
	}

	public static User create() {
		return create("nameTest", "lastNameTest", "passwordTest", "emailTest", "phoneTest");
	}

	public static List<User> create(Integer number) {
		List<User> users = new ArrayList<User>(number);

		for (int i = 0; i < number; i++) {
			users.add(create("nameTest" + i, "lastNameTest" + i, "passwordTest" + i, "emailTest" + i, "phoneTest" + i));
		}

		return users;
	}

}
