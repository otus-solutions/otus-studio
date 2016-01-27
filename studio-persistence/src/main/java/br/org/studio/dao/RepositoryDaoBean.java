package br.org.studio.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;

import br.org.studio.entities.repository.Repository;
import br.org.studio.exceptions.DataNotFoundException;

public class RepositoryDaoBean extends GenericDaoBean implements RepositoryDao{

    @SuppressWarnings("unchecked")
	@Override
    public List<Repository> fetch(String name) throws DataNotFoundException {
        Criteria criteria = createCriteria(Repository.class);
        criteria.add(Restrictions.eq("name", name));

        return listNotWaitingEmpty(criteria);
    }

    @SuppressWarnings("unchecked")
	@Override
    public List<Repository> fetchAll() throws DataNotFoundException {
    	Criteria criteria = createCriteria(Repository.class);

    	return listNotWaitingEmpty(criteria);
    }
}
