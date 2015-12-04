package br.org.studio.configuration;

import javax.ejb.Local;
import javax.ejb.Stateless;
import javax.inject.Inject;

import br.org.owail.sender.email.Sender;
import br.org.studio.configuration.factories.ConfigFactory;
import br.org.studio.dao.SystemConfigDao;
import br.org.studio.email.EmailNotifierService;
import br.org.studio.email.WelcomeNotificationEmail;
import br.org.studio.entities.system.SystemConfig;
import br.org.studio.entities.system.User;
import br.org.studio.exception.EmailNotificationException;
import br.org.studio.exception.FillEmailSenderException;
import br.org.studio.exception.FillUserException;
import br.org.studio.exceptions.DataNotFoundException;
import br.org.studio.rest.dtos.EmailSenderDto;
import br.org.studio.rest.dtos.SystemConfigDto;
import br.org.studio.rest.dtos.UserDto;
import br.org.tutty.Equalizer;

/**
 * Created by diogoferreira on 28/09/15.
 */
@Stateless
@Local(SystemConfigService.class)
public class SystemConfigServiceBean implements SystemConfigService {

	@Inject
	private SystemConfigDao systemConfigDao;

    @Inject
    private EmailNotifierService emailNotifierService;

	@Override
	public Boolean isReady() {
		return systemConfigDao.isReady();
	}

	@Override
	public void createAdmin(UserDto admDto) throws FillUserException {
		try {
			User user = new User();

			Equalizer.equalize(admDto, user);

			user.becomesAdm();
			systemConfigDao.persist(user);

		} catch (IllegalAccessException | NoSuchFieldException e) {
			throw new FillUserException();
		}
	}

	@Override
	public void createInitialSystemConfig(SystemConfigDto systemConfigDto) throws FillEmailSenderException {
		try{
			createAdmin(systemConfigDto.getUserDto());

			SystemConfig systemConfig = ConfigFactory.buildConfigEmailSender(systemConfigDto.getEmailSenderDto());
			systemConfig.finalizeConfiguration();

			systemConfigDao.persist(systemConfig);
		}catch (IllegalAccessException | NoSuchFieldException | FillUserException e){
			throw new FillEmailSenderException();
		}
	}

    @Override
    public void verifyEmailService(EmailSenderDto emailSenderDto) throws EmailNotificationException {
        try {
            emailNotifierService.sendWelcomeEmail(emailSenderDto);

        } catch (EmailNotificationException | DataNotFoundException e) {
            throw new EmailNotificationException(e);
        }

    }
}
