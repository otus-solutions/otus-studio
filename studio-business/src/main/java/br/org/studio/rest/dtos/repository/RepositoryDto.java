package br.org.studio.rest.dtos.repository;

import br.org.tutty.Equalization;

public class RepositoryDto {
	@Equalization(name = "name")
	private String name;

	@Equalization(name = "database")
	private String database;

	@Equalization(name = "host")
	private String host;

	@Equalization(name = "port")
	private Integer port;

	@Equalization(name = "username")
	private String username;

	@Equalization(name = "password")
	private String password;

	@Equalization(name = "description")
	private String description;

	public String getName() {
		return name;
	}

	public String getDatabase() {
		return database;
	}

	public String getHost() {
		return host;
	}

	public Integer getPort() {
		return port;
	}

	public String getUsername() {
		return username;
	}

	public String getPassword() {
		return password;
	}

	public String getDescription() {
		return description;
	}

}
