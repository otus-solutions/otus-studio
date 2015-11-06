package br.org.studio.email;

import java.util.HashMap;
import java.util.Map;

import br.org.owail.sender.email.Email;
import br.org.owail.sender.email.Mailer;
import br.org.studio.entities.system.User;

public class NewUserNotificationEmail extends Email implements StudioEmail {

	private final String TEMPLATE = "/template/new-user-notification-template.html";
	private final String SUBJECT = "Alerta - Novo usuário cadastrado no sistema OTUS STUDIO";
	private HashMap<String, String> dataMap;

	public NewUserNotificationEmail(User user) {
		buildDataMap(user);
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

	public void defineAdminRecipient(User user){
		addTORecipient("recipient", user.getEmail());
	}

    private void defineSubject(){
    	setSubject(SUBJECT);
    }

    private void buildDataMap(User user){
    	dataMap = new HashMap<String, String>();
    	dataMap.put("name", user.getName());
    	dataMap.put("surname", user.getSurname());
    	dataMap.put("mail", user.getEmail());
    	dataMap.put("phone", user.getPhone());
    }

}
