package br.com.studio.rest.dto.loginAuthentication;

import org.junit.Before;
import org.junit.Test;

import br.org.studio.rest.dtos.LoginAuthenticationDto;

import com.google.gson.Gson;

public class LoginAuthenticationTest {

	private LoginAuthenticationDto login;
	
	@Before
	public void setup(){
		login = new LoginAuthenticationDto();
		login.setEmail("emailTest");
		login.setPassword("passwordTest");
	}
	
	@Test
	public void toString_should_return_a_json_with_value_of_data_equal_to_true(){
		Gson gson = new Gson();
		login generatedJson = gson.fromJson();
		
	}
}
