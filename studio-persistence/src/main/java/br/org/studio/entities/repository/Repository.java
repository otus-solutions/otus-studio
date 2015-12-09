package br.org.studio.entities.repository;

import br.org.tutty.Equalization;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Entity
@Table(name = "repository", catalog = "studio", schema = "public")
@SequenceGenerator(name = "repositorySequence", sequenceName = "repository_seq", initialValue = 1, allocationSize = 1)
public class Repository implements Serializable {

	private static final long serialVersionUID = 7319297696352112154L;

	@Id
    @GeneratedValue(generator = "repositorySequence", strategy = GenerationType.SEQUENCE)
    private Long id;

    @Equalization(name = "name")
    @NotNull
    private String name;

    @Equalization(name = "database")
    @NotNull
    private String database;

    @Equalization(name = "host")
    @NotNull
    private String host;

    @Equalization(name = "port")
    @NotNull
    private String port;

    @Equalization(name = "username")
    @NotNull
    private String username;

    @Equalization(name = "password")
    @NotNull
    private String password;

    @Equalization(name = "description")
    private String description;
}
