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
	private String port;

	@Equalization(name = "username")
	private String username;

	@Equalization(name = "password")
	private String password;

	@Equalization(name = "description")
	private String description;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDatabase() {
		return database;
	}

	public void setDatabase(String database) {
		this.database = database;
	}

	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public String getPort() {
		return port;
	}

	public void setPort(String port) {
		this.port = port;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
