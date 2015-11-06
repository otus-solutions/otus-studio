package br.org.studio.entities.system;

import javax.persistence.*;

import br.org.studio.entities.email.EmailSender;

import java.io.Serializable;

/**
 * Created by diogoferreira on 29/09/15.
 */
@Entity
@Table(name = "system_config", catalog = "studio")
@SequenceGenerator(name = "SystemConfigSequence", sequenceName = "system_config_seq", initialValue = 1, allocationSize = 1)
public class SystemConfig implements Serializable{

	private static final long serialVersionUID = -2630898111000415759L;

	@Id
    @GeneratedValue(generator = "SystemConfigSequence", strategy = GenerationType.SEQUENCE)
    private Long id;

    private Boolean ready;
    
    @OneToOne(cascade = CascadeType.ALL)
    private EmailSender emailSender;
    
    public SystemConfig(EmailSender emailSender) {
		this.emailSender = emailSender;
	}
    
	protected SystemConfig() {
	}

	public void finalizeConfiguration(){
        this.ready = Boolean.TRUE;
    }

    public Boolean isReady(){
        return ready;
    }

	public EmailSender getEmailSender() {
		return emailSender;
	}
    
}
