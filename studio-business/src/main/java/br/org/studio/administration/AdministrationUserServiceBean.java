package br.org.studio.administration;

import br.org.studio.dao.UserDao;
import br.org.studio.entities.system.User;
import br.org.studio.rest.dtos.UserDto;
import br.org.studio.rest.dtos.administration.AdministrationUser;
import br.org.tutty.Equalizer;

import javax.ejb.Local;
import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.List;
import java.util.function.Consumer;

/**
 * Created by diogoferreira on 29/10/15.
 */
@Stateless
@Local(AdministrationUserService.class)
public class AdministrationUserServiceBean implements AdministrationUserService{

    @Inject
    private UserDao userDao;

    @Override
    public AdministrationUser fetchUsers(){
        AdministrationUser administrationUser = new AdministrationUser();

        List<User> users = userDao.fetchAll();

        users.stream().forEach(new Consumer<User>() {
            @Override
            public void accept(User user) {
                UserDto userDto = new UserDto();

                try {
                    Equalizer.equalize(user, userDto);
                    administrationUser.addUser(userDto, user.isEnable());
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });

        return administrationUser;
    }
}
