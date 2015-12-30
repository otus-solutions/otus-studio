package br.org.studio.context;

import javax.servlet.http.HttpSession;

import br.org.studio.exception.SessionNotFoundException;
import br.org.studio.rest.dtos.UserDto;

public interface ContextService {

	UserDto getLoggedUser(HttpSession httpSession) throws SessionNotFoundException;

    void removeLoggedUser(HttpSession httpSession);
}
