package br.org.studio.dao;

import javax.ejb.Local;
import javax.ejb.Stateless;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;

import br.org.studio.entities.system.User;
import br.org.studio.exceptions.DataNotFoundException;

import java.util.List;

@Stateless
@Local(UserDao.class)
public class UserDaoBean extends GenericDaoBean implements UserDao, GenericDao {

	@Override
	public User fetchByEmail(String email) throws DataNotFoundException {
		Criteria criteria = createCriteria(User.class);

		criteria.add(Restrictions.eq("email", email));

		return (User) uniqueResultNotWaitingEmpty(criteria);
	}

    @Override
    public List fetchAll(){
        Criteria criteria = createCriteria(User.class);
        return list(criteria);
    }


}
