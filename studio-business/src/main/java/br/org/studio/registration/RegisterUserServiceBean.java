package br.org.studio.registration;

import javax.ejb.Local;
import javax.ejb.Stateless;
import javax.inject.Inject;

import br.org.studio.dao.SystemConfigDao;
import br.org.studio.email.EmailNotifierService;
import br.org.studio.email.NewUserNotificationEmail;
import br.org.studio.entities.system.User;
import br.org.studio.exception.EmailNotificationException;
import br.org.studio.exception.FillUserException;
import br.org.studio.exceptions.DataNotFoundException;
import br.org.studio.rest.dtos.UserDto;
import br.org.tutty.Equalizer;

@Stateless
@Local(RegisterUserService.class)
public class RegisterUserServiceBean implements RegisterUserService {

	@Inject
	private SystemConfigDao genericDao;
	@Inject
	private EmailNotifierService emailNotifier;

	@Override
	public void createUser(UserDto userDto) throws FillUserException {
		try {
			User user = new User();
			Equalizer.equalize(userDto, user);
			genericDao.persist(user);
			
			notifyAdm(user);
			
		} catch (IllegalAccessException | NoSuchFieldException e) {
			throw new FillUserException();
		}
	}

	private void notifyAdm(User user) {
		try {
			try {
				emailNotifier.sendEmail(new NewUserNotificationEmail(user));
			} catch (DataNotFoundException e) {
				e.printStackTrace();
			}
		} catch (EmailNotificationException e) {
			e.printStackTrace();
		}
	}
}