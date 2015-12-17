package br.org.studio.security;

import java.io.Serializable;

import javax.ejb.Local;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.servlet.http.HttpSession;

import br.org.studio.context.UserDataContext;
import br.org.studio.dao.UserDao;
import br.org.studio.entities.system.User;
import br.org.studio.exception.EmailNotFoundException;
import br.org.studio.exception.InvalidPasswordException;
import br.org.studio.exception.UserDisabledException;
import br.org.studio.exceptions.DataNotFoundException;
import br.org.studio.rest.dtos.LoginAuthenticationDto;

@Stateless
@Local(SecurityService.class)
public class SecurityServiceBean implements SecurityService, Serializable {

	private static final long serialVersionUID = 4909468163432086501L;

	@Inject
	private UserDao userDao;

	@Inject
	private UserDataContext userDataContext;

	@Override
	public void authenticate(LoginAuthenticationDto loginDto) throws InvalidPasswordException, EmailNotFoundException, UserDisabledException {
		try {
			User user = userDao.fetchByEmail(loginDto.getEmail());
			HttpSession httpSession = loginDto.getHttpSession();

			if(user.getPassword().equals(loginDto.getPassword())){
                if(user.isEnable()){
                    userDataContext.login(httpSession, user);
                }else {
                    throw new UserDisabledException();
                }

			}else{
				throw new InvalidPasswordException();
			}

		} catch (DataNotFoundException e) {
			throw new EmailNotFoundException();
		}
	}
}
