package br.org.studio.context;

import javax.ejb.Local;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.servlet.http.HttpSession;

import br.org.studio.entities.system.User;
import br.org.studio.exception.SessionNotFoundException;
import br.org.studio.exceptions.DataNotFoundException;
import br.org.studio.rest.dtos.UserDto;
import br.org.tutty.Equalizer;

@Stateless
@Local(ContextService.class)
public class ContextServiceBean implements ContextService {

	@Inject
	private UserDataContext userDataContext;

	@Override
	public UserDto getLoggedUser(HttpSession httpSession) throws SessionNotFoundException{
		try {
			User loggedUser = userDataContext.getLoggedUser(httpSession);
			UserDto userDto = new UserDto();

			Equalizer.equalize(loggedUser, userDto);
			return userDto;

		} catch (IllegalAccessException | NoSuchFieldException | DataNotFoundException e) {
			throw new SessionNotFoundException();
		}
	}

    @Override
    public void removeLoggedUser(HttpSession httpSession){
        userDataContext.logout(httpSession);
    }
}
