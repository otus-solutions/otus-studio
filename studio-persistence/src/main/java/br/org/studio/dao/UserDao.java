package br.org.studio.dao;

import br.org.studio.entities.system.User;
import br.org.studio.exceptions.DataNotFoundException;

public interface UserDao {

	User fetchByEmail(String email) throws DataNotFoundException;

}
