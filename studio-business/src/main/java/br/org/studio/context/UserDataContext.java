package br.org.studio.context;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import javax.servlet.http.HttpSession;

import br.org.studio.entities.system.User;
import br.org.studio.exceptions.DataNotFoundException;

@ApplicationScoped
public class UserDataContext implements Serializable {

	private static final long serialVersionUID = 109656450161251588L;

	private Map<String, User> loggedUser;

	@PostConstruct
	public void setUp(){
		loggedUser = new HashMap<String, User>();
	}

	public void login(HttpSession httpSession, User user){
		loggedUser.put(httpSession.getId(), user);
	}

    public void logout(HttpSession httpSession){
        loggedUser.remove(httpSession.getId());
    }

	public User getLoggedUser(HttpSession httpSession) throws DataNotFoundException{
		if(loggedUser.containsKey(httpSession.getId())){
			return loggedUser.get(httpSession.getId());
		}else {
			throw new DataNotFoundException();
		}
	}
}
