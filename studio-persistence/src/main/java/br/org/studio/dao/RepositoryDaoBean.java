package br.org.studio.dao;

import br.org.studio.entities.repository.Repository;
import br.org.studio.exceptions.DataNotFoundException;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;

import java.util.List;

public class RepositoryDaoBean extends GenericDaoBean implements RepositoryDao{

    @Override
    public List<Repository> fetch(String name) throws DataNotFoundException {
        Criteria criteria = createCriteria(Repository.class);
        criteria.add(Restrictions.eq("name", name));

        return listNotWaitingEmpty(criteria);
    }
}
