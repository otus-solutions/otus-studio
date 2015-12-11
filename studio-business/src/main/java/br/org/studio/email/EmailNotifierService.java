package br.org.studio.email;

import br.org.owail.sender.email.Sender;
import br.org.studio.exception.EmailNotificationException;
import br.org.studio.exceptions.DataNotFoundException;
import br.org.studio.rest.dtos.EmailSenderDto;

public interface EmailNotifierService {

    void sendEmail(StudioEmail email) throws EmailNotificationException, DataNotFoundException;

    Sender getSender() throws DataNotFoundException;

    void sendWelcomeEmail(EmailSenderDto emailSenderDto) throws EmailNotificationException, DataNotFoundException;
}
