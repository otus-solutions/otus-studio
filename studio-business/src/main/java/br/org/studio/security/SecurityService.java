package br.org.studio.security;

import br.org.studio.exception.EmailNotFoundException;
import br.org.studio.exception.InvalidPasswordException;
import br.org.studio.rest.dtos.LoginAuthenticationDto;

public interface SecurityService {

	void authenticate(LoginAuthenticationDto loginDto)
			throws InvalidPasswordException, EmailNotFoundException;
}
