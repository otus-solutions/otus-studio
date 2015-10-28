package br.org.studio.configuration;

import br.org.studio.exception.FillUserException;
import br.org.studio.rest.dtos.UserDto;


/**
 * Created by diogoferreira on 28/09/15.
 */
public interface SystemConfigService {

    Boolean isReady();

	void createAdmin(UserDto admDto) throws FillUserException;
}
