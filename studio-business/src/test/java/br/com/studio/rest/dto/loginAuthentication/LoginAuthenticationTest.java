package br.com.studio.rest.dto.loginAuthentication;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import br.org.studio.dao.UserDao;
import br.org.studio.entities.system.User;
import br.org.studio.exception.EmailNotFoundException;
import br.org.studio.exception.InvalidPasswordException;
import br.org.studio.exceptions.DataNotFoundException;
import br.org.studio.rest.dtos.LoginAuthenticationDto;
import br.org.studio.security.EncryptorResources;
import br.org.studio.security.SecurityServiceBean;

@RunWith(MockitoJUnitRunner.class)
public class LoginAuthenticationTest {
	
	private static final String EMAIL = "joao.silveira@gmail.com";
	private static final String PASSWORD = "158927&";
	private static final String ENCRYPT_PASSWORD = "5f4dcc3b5aa765d61d8327deb882cf99";

	
	@InjectMocks
	private LoginAuthenticationDto login;
	
	@Mock
	private UserDao userDao;
	@Mock
	private SecurityServiceBean securityService;
	@Mock
	private User user;
	@Mock
	private SecurityServiceBean service;
	@Mock
	private EncryptorResources encrypt;

	
	@Test
	public void encrypt_password_success() throws DataNotFoundException, InvalidPasswordException, EmailNotFoundException{
		Mockito.when(userDao.fetchByEmail(EMAIL)).thenReturn(user);
		Mockito.when(user.getPassword()).thenReturn(PASSWORD);
		
		Mockito.verify(login).encryptPassword();
		
	}

}
