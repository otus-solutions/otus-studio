package br.org.studio.context;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;

import br.org.studio.entities.system.User;

@ApplicationScoped
public class UserDataContext implements Serializable {

	private static final long serialVersionUID = 109656450161251588L;

	private List<User> loggedUser;
	
	@PostConstruct
	public void setUp(){
		loggedUser = new ArrayList<User>();
	}
	
	public void login(User user){
		loggedUser.add(user);
	}
}
