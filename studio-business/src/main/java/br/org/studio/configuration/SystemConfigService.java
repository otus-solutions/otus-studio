package br.org.studio.configuration;

import br.org.studio.exception.EmailNotificationException;
import br.org.studio.exception.FillUserException;
import br.org.studio.rest.dtos.EmailSenderDto;
import br.org.studio.rest.dtos.SystemConfigDto;
import br.org.studio.rest.dtos.UserDto;


/**
 * Created by diogoferreira on 28/09/15.
 */
public interface SystemConfigService {

    Boolean isReady();

	void createAdmin(UserDto admDto) throws FillUserException;

	void createInitialSystemConfig(SystemConfigDto systemConfigDto) throws Exception;

    void verifyEmailService(EmailSenderDto emailSenderDto) throws EmailNotificationException;
}
