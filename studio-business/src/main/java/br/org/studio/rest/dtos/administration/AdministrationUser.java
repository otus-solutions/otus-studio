package br.org.studio.rest.dtos.administration;

import br.org.studio.rest.dtos.UserDto;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by diogoferreira on 29/10/15.
 */
public class AdministrationUser {

    private List<UserDto> activedUsers;

    private List<UserDto> disabledUsers;

    public AdministrationUser() {
        activedUsers = new ArrayList<>();
        disabledUsers = new ArrayList<>();
    }

    public void addUser(UserDto userDto, Boolean enable){
        if(enable){
            activedUsers.add(userDto);
        }else {
            disabledUsers.add(userDto);
        }
    }

    public List<UserDto> getActivedUsers() {
        return activedUsers;
    }

    public List<UserDto> getDisabledUsers() {
        return disabledUsers;
    }
}
