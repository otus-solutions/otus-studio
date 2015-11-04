package br.org.studio.rest.dtos.administration;

import br.org.studio.rest.dtos.UserDto;
import org.junit.Assert;
import org.junit.Test;

/**
 * Created by diogoferreira on 03/11/15.
 */
public class AdministrationUserTest {

    private AdministrationUser administrationUser;

    @Test
    public void addUser_should_add_to_activedUserList(){
        administrationUser = new AdministrationUser();

        UserDto userDto = new UserDto();

        administrationUser.addUser(userDto, Boolean.TRUE);
        Assert.assertEquals(1, administrationUser.getActivedUsers().size());
        Assert.assertEquals(0, administrationUser.getDisabledUsers().size());
    }

    @Test
    public void addUser_should_add_to_disabledUsersList(){
        administrationUser = new AdministrationUser();

        UserDto userDto = new UserDto();

        administrationUser.addUser(userDto, Boolean.FALSE);
        Assert.assertEquals(0, administrationUser.getActivedUsers().size());
        Assert.assertEquals(1, administrationUser.getDisabledUsers().size());
    }

    @Test
    public void addUser_should_add_to_disabledUsersList_and_activedUserList(){
        administrationUser = new AdministrationUser();

        UserDto disableduserDto = new UserDto();
        UserDto enableduserDto = new UserDto();

        administrationUser.addUser(disableduserDto, Boolean.FALSE);
        administrationUser.addUser(enableduserDto, Boolean.TRUE);

        Assert.assertEquals(1, administrationUser.getActivedUsers().size());
        Assert.assertEquals(1, administrationUser.getDisabledUsers().size());
    }
}
