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

    @Equalization(name = "admin_flag")
	private Boolean adm;

	@Equalization(name = "surname")
	@NotNull
	@Column(name = "surname")
	private String surname;

	@Equalization(name = "phone")
	@NotNull
	private String phone;

	@Equalization(name = "email")
	@NotNull
	private String email;

	@Equalization(name = "password")
	@NotNull
	private String password;

    @Equalization(name = "enable")
    private Boolean enable;

	public User() {
		this.adm = Boolean.FALSE;
        this.enable = Boolean.FALSE;
	}

	public User(String name, String surname, String password, String email, String phone) {
		this.name = name;
		this.surname = surname;
		this.password = password;
		this.email = email;
		this.phone = phone;
	}

    public void enable(){
        this.enable = Boolean.TRUE;
    }

    public void disable(){
        this.enable = Boolean.FALSE;
    }

	public void becomesAdm() {
		this.adm = Boolean.TRUE;
        enable();
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

	public String getSurname() {
		return surname;
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

    public Boolean isEnable() {
        return enable;
    }
}
