package br.org.studio.email;

import br.org.studio.exception.EmailNotificationException;
import br.org.studio.exceptions.DataNotFoundException;

public interface EmailNotifierService {
	
	public void sendEmail(NewUserNotificationEmail email) throws EmailNotificationException, DataNotFoundException;

}
