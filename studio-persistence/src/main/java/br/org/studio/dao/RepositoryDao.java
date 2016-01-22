package br.org.studio.dao;

import br.org.studio.entities.repository.Repository;
import br.org.studio.exceptions.DataNotFoundException;

import javax.ejb.Stateless;
import java.util.List;

/**
 * Created by diogoferreira on 01/12/15.
 */
@Stateless
public interface RepositoryDao extends GenericDao{
    List<Repository> fetch(String name) throws DataNotFoundException;

    List<Repository> fetchAll() throws DataNotFoundException;
}
