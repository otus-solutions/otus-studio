package br.org.studio.rest;

import br.org.studio.administration.AdministrationUserServiceBean;
import br.org.studio.rest.dtos.UserDto;
import br.org.studio.rest.dtos.administration.AdministrationUser;

import com.google.gson.Gson;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Matchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.List;

@RunWith(MockitoJUnitRunner.class)
public class AdministrationUsersResourceTest {

    @InjectMocks
    private AdministrationUsersResource administrationUsersResource = new AdministrationUsersResource();

    @Mock
    private AdministrationUserServiceBean administrationUserServiceBean;

    @Test
    public void getUsers_should_fetch_administrationUser_to_json(){
        AdministrationUser administrationUser = new AdministrationUser();

        Mockito.when(administrationUserServiceBean.fetchUsers()).thenReturn(administrationUser);

        String users = administrationUsersResource.getUsers();

        Assert.assertEquals(users, new Gson().toJson(administrationUser));
    }

    @Test
    public void disableUsers_should_disable_users_using_service(){
        List<UserDto> users = new ArrayList<>();
        users.add(new UserDto());
        users.add(new UserDto());

        String usersJson = new Gson().toJson(users);

        String result = administrationUsersResource.disableUsers(usersJson);
        Mockito.verify(administrationUserServiceBean).disableUsers(Matchers.anyList());

        Response response = new Gson().fromJson(result, Response.class);

        Assert.assertEquals(Boolean.TRUE, response.getData());
    }

    @Test
    public void enableUsers_should_enable_users_using_service(){
        List<UserDto> users = new ArrayList<>();
        users.add(new UserDto());
        users.add(new UserDto());

        String usersJson = new Gson().toJson(users);

        String result = administrationUsersResource.enableUsers(usersJson);
        Mockito.verify(administrationUserServiceBean).enableUsers(Matchers.anyList());
        
        Response response = new Gson().fromJson(result, Response.class);

        Assert.assertEquals(Boolean.TRUE, response.getData());
    }
}
