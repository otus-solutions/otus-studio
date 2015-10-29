package br.org.studio.administration;

import br.org.studio.rest.dtos.administration.AdministrationUser;

/**
 * Created by diogoferreira on 29/10/15.
 */
public interface AdministrationUserService {
    AdministrationUser fetchUsers();
}
