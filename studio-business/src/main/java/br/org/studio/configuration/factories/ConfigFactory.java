package br.org.studio.configuration.factories;

import br.org.studio.entities.email.EmailSender;
import br.org.studio.entities.system.SystemConfig;
import br.org.studio.exception.FillEmailSenderException;
import br.org.studio.rest.dtos.EmailSenderDto;
import br.org.tutty.Equalizer;

public class ConfigFactory {
	
	public static SystemConfig buildConfigEmailSender(EmailSenderDto emailSenderDto) throws FillEmailSenderException, IllegalAccessException, NoSuchFieldException {
		try{
			EmailSender emailSender = new EmailSender();			
			Equalizer.equalize(emailSenderDto, emailSender);
			
			return new SystemConfig(emailSender);
		} catch(IllegalAccessException | NoSuchFieldException e){
			throw new FillEmailSenderException();
		}
	}
}
