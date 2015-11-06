package br.org.studio.dao;

import javax.ejb.Local;
import javax.ejb.Stateless;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;

import br.org.studio.entities.system.User;
import br.org.studio.exceptions.DataNotFoundException;

@Stateless
@Local(UserDao.class)
public class UserDaoBean extends GenericDaoBean implements UserDao {

	private static final String EMAIL = "email";
	private static final String ADM = "adm";
	

	@Override
	public Boolean emailExists(String email) {
		Criteria criteria = createCriteria(User.class);
		criteria.add(Restrictions.eq(EMAIL, email));

		if (uniqueResult(criteria) == null) {
			return true;
		} else {
			return false;
		}
	}

	@Override
	public User findAdmin() throws DataNotFoundException {
		Criteria query = createCriteria(User.class);
		query.add(Restrictions.eq(ADM, Boolean.TRUE));
		return (User) uniqueResultNotWaitingEmpty(query);
	}

}
