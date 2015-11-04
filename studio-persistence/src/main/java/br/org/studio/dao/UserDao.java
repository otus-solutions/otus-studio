package br.org.studio.dao;

import br.org.studio.entities.system.User;
import br.org.studio.exceptions.DataNotFoundException;

import java.util.List;

public interface UserDao extends GenericDao{

	User fetchByEmail(String email) throws DataNotFoundException;

    List fetchAll();
}
