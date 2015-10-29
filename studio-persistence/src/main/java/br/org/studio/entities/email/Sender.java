package br.org.studio.entities.email;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "sender", catalog = "studio", schema = "public")
@SequenceGenerator(name = "senderSequence", sequenceName = "sender_seq", initialValue = 1, allocationSize = 1)
public class Sender implements Serializable {
	
	private static final long serialVersionUID = -2231961499270874947L;
	
	@Id
    @GeneratedValue(generator = "senderSequence", strategy = GenerationType.SEQUENCE)
    private Long id;
	
	private String name;
	
	private String emailAddress;
	
	private String password;

	public Sender(String name, String emailAddress, String password) {
		super();
		this.name = name;
		this.emailAddress = emailAddress;
		this.password = password;
	}
}
