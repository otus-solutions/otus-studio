package br.org.studio.entities.system;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import br.org.tutty.Equalization;

@Entity
@Table(name = "user", catalog = "studio", schema = "public")
@SequenceGenerator(name = "UserSequence", sequenceName = "user_seq", initialValue = 1, allocationSize = 1, catalog = "studio", schema = "public")
public class User implements Serializable {

	private static final long serialVersionUID = -4681580716925463211L;

	@Id
	@GeneratedValue(generator = "UserSequence", strategy = GenerationType.SEQUENCE)
	private Integer id;

	@Equalization(name = "name")
	private String name;

	private Boolean adm;

	@Equalization(name = "last_name")
	private String last_name;

	@Equalization(name = "phone")
	private String phone;

	@Equalization(name = "email")
	private String email;

	@Equalization(name = "password")
	private String password;
	
	public User() {
		this.adm = Boolean.FALSE;
	}

	public void becomesAdm() {
		this.adm = Boolean.TRUE;
	}
}
