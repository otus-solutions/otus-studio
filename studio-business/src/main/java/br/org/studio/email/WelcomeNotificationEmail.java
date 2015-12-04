package br.org.studio.email;

import br.org.owail.sender.email.Email;
import br.org.owail.sender.email.Mailer;
import br.org.studio.entities.system.User;

import java.util.HashMap;
import java.util.Map;

public class WelcomeNotificationEmail extends Email implements StudioEmail {

	private final String TEMPLATE = "/template/welcome-notification-template.html";
	private final String SUBJECT = "Seja Bem Vindo ao Sistema Studio";
	private HashMap<String, String> dataMap;

	public WelcomeNotificationEmail() {
		buildDataMap();
		defineSubject();
	}

	@Override
	public String getTemplatePath() {
		return TEMPLATE;
	}

	@Override
	public Map<String, String> getContentDataMap() {
		return dataMap;
	}

	@Override
	public String getContentType() {
		return Mailer.HTML;
	}

	public void defineRecipient(String email){
		addTORecipient("recipient", email);
	}

    private void defineSubject(){
    	setSubject(SUBJECT);
    }

    private void buildDataMap(){
    	dataMap = new HashMap<String, String>();
    }

}
