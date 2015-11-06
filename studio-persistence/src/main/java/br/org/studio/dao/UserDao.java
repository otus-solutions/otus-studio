package br.org.studio.dao;

import br.org.studio.entities.system.User;
import br.org.studio.exceptions.DataNotFoundException;

public interface UserDao extends GenericDao {

    Boolean emailExists(String email);

	User findAdmin() throws DataNotFoundException;

}
