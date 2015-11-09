package br.org.studio.dao;

import javax.ejb.Local;
import javax.ejb.Stateless;

import org.hibernate.Criteria;
import org.hibernate.NonUniqueResultException;
import org.hibernate.criterion.Restrictions;

import br.org.studio.entities.system.User;
import br.org.studio.exceptions.DataNotFoundException;

import java.util.List;

@Stateless
@Local(UserDao.class)
public class UserDaoBean extends GenericDaoBean implements UserDao {

    private static final String EMAIL = "email";
    private static final String ADM = "adm";


    @Override
    public Boolean emailExists(String email) {
        Criteria criteria = createCriteria(User.class);
        criteria.add(Restrictions.eq(EMAIL, email));

        try {
            if (uniqueResult(criteria) == null) {
                return false;
            } else {
                return true;
            }
        } catch (NonUniqueResultException e) {
            return true;
        }

    }

    @Override
    public User findAdmin() throws DataNotFoundException {
        Criteria query = createCriteria(User.class);
        query.add(Restrictions.eq(ADM, Boolean.TRUE));
        return (User) uniqueResultNotWaitingEmpty(query);
    }

    @Override
    public User fetchByEmail(String email) throws DataNotFoundException {
        Criteria criteria = createCriteria(User.class);

        criteria.add(Restrictions.eq("email", email));

        return (User) uniqueResultNotWaitingEmpty(criteria);
    }

    @Override
    public User fetchEnableByEmail(String email) throws DataNotFoundException {
        Criteria criteria = createCriteria(User.class);

        criteria.add(Restrictions.eq("email", email));
        criteria.add(Restrictions.eq("enable", true));

        return (User) uniqueResultNotWaitingEmpty(criteria);
    }

    @Override
    public List fetchAll() {
        Criteria criteria = createCriteria(User.class);
        return list(criteria);
    }

}
