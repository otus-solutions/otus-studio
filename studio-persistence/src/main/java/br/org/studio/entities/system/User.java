package br.org.studio.entities.system;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

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
	@NotNull
	private String name;

	private Boolean adm;

	@Equalization(name = "lastName")
	@NotNull
	@Column(name = "last_name")
	private String lastName;

	@Equalization(name = "phone")
	@NotNull
	private String phone;

	@Equalization(name = "email")
	@NotNull
	private String email;

	@Equalization(name = "password")
	@NotNull
	private String password;

	public User() {
		this.adm = Boolean.FALSE;
	}

	public User(String name, String lastName, String password, String email, String phone) {
		this.name = name;
		this.lastName = lastName;
		this.password = password;
		this.email = email;
		this.phone = phone;

	}
	
	public void becomesAdm() {
		this.adm = Boolean.TRUE;
	}

	public Integer getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public Boolean getAdm() {
		return adm;
	}

	public String getLastName() {
		return lastName;
	}

	public String getPhone() {
		return phone;
	}

	public String getEmail() {
		return email;
	}

	public String getPassword() {
		return password;
	}
}
