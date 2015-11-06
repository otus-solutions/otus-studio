package br.org.studio.validation;

import javax.inject.Inject;

import br.org.studio.dao.UserDao;

public class EmailConstraint {

	@Inject
	private UserDao userDao;

	public Boolean isUnique(String emailToVerify) {
		if (emailToVerify != null && userDao.emailExists(emailToVerify)) {
			return false;
		} else {
			return true;
		}
	}

}
