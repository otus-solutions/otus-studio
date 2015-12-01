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
}
