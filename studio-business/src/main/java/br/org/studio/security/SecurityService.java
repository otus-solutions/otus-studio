package br.org.studio.security;

import br.org.studio.exception.EmailNotFoundException;
import br.org.studio.exception.InvalidPasswordException;
import br.org.studio.exception.UserDisabledException;
import br.org.studio.rest.dtos.LoginAuthenticationDto;

import javax.servlet.http.HttpSession;

public interface SecurityService {

	void authenticate(LoginAuthenticationDto loginDto)
        throws InvalidPasswordException, EmailNotFoundException, UserDisabledException;

    void logout(HttpSession httpSession);

    Boolean isLogged(HttpSession httpSession);
}
