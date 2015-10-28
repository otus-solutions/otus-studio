package br.org.studio.registration;

import br.org.studio.exception.FillUserException;
import br.org.studio.rest.dtos.UserDto;

public interface RegisterUserService {

	void createUser(UserDto userDto) throws FillUserException;
}
