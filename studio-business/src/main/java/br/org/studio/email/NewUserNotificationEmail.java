package br.org.studio.email;

import java.util.Map;

import br.org.owail.sender.email.Email;
import br.org.owail.sender.email.Mailer;
import br.org.owail.sender.email.Sender;

public class NewUserNotificationEmail extends Email implements StudioEmail {
	
	private final String TEMPLATE = "/email-templates/new-user-notification-template.html";
	
	protected NewUserNotificationEmail() {
		defineSender();
	}

	@Override
	public String getTemplatePath() {
		return TEMPLATE;
	}

	@Override
	public Map<String, String> getContentDataMap() {
		return null;
	}

	@Override
	public String getContentType() {
		return Mailer.HTML;
	}
	
	/*
	 *  TODO: Deve buscar no banco
	 */
    private void defineSender() {
    	setFrom(new Sender("name", "emailAddress", "password"));
    }

}
