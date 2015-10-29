package br.org.studio.rest.dtos;

import br.org.tutty.Equalization;

/**
 * Created by diogoferreira on 29/10/15.
 */
public class UserDto {

    @Equalization(name = "name")
    private String name;

    @Equalization(name = "email")
    private String email;
}
