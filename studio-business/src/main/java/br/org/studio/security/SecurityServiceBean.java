package br.org.studio.security;

import java.io.Serializable;

import javax.ejb.Local;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.servlet.http.HttpSession;

import br.org.studio.context.ContextService;
import br.org.studio.context.UserDataContext;
import br.org.studio.dao.UserDao;
import br.org.studio.entities.system.User;
import br.org.studio.exception.EmailNotFoundException;
import br.org.studio.exception.InvalidPasswordException;
import br.org.studio.exception.SessionNotFoundException;
import br.org.studio.exception.UserDisabledException;
import br.org.studio.exceptions.DataNotFoundException;
import br.org.studio.rest.dtos.LoginAuthenticationDto;
import br.org.studio.rest.dtos.UserDto;

@Stateless
@Local(SecurityService.class)
public class SecurityServiceBean implements SecurityService, Serializable {

	private static final long serialVersionUID = 4909468163432086501L;

	@Inject
	private UserDao userDao;

	@Inject
	private UserDataContext userDataContext;

    @Inject
    private ContextService contextService;

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

    @Override
    public void logout(HttpSession httpSession){
        userDataContext.logout(httpSession);
    }

    @Override
    public Boolean isLogged(HttpSession httpSession){
        try {
            contextService.getLoggedUser(httpSession);
            return true;

        } catch (SessionNotFoundException e) {
            return false;
        }
    }
}
