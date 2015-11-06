package br.org.studio.entities.email;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import br.org.tutty.Equalization;

@Entity
@Table(name = "email_sender", catalog = "studio", schema = "public")
@SequenceGenerator(name = "senderSequence", sequenceName = "sender_seq", initialValue = 1, allocationSize = 1)
public class EmailSender implements Serializable {
	
	private static final long serialVersionUID = -2231961499270874947L;
	
	@Id
    @GeneratedValue(generator = "senderSequence", strategy = GenerationType.SEQUENCE)
    private Long id;
	
	@Equalization(name = "name")
	@NotNull
	private String name;
	
	@Equalization(name = "email")
	@NotNull
	private String emailAddress;
	
	@Equalization(name = "password")
	@NotNull
	private String password;

	public EmailSender() {
	}
	
	public EmailSender(String name, String emailAddress, String password) {
		super();
		this.name = name;
		this.emailAddress = emailAddress;
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public String getEmailAddress() {
		return emailAddress;
	}

	public String getPassword() {
		return password;
	}
	
}
