package br.org.studio.rest;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;

import com.google.gson.JsonSerializer;
import org.junit.Before;
import org.junit.Test;

import br.org.studio.rest.dtos.UserDto;

import com.google.gson.Gson;

import javax.json.JsonObject;

public class ResponseTest {

	private UserDto user;

	@Before
	public void setup() {
		user = new UserDto();
		user.setEmail("emailValue");
		user.setName("nameValue");
		user.setPassword("passwordValue");
		user.setPhone("phoneValue");
		user.setSurname("surnameValue");
	}

	@Test
	public void toString_should_return_a_json_with_value_of_data_equal_to_true() {
		Response response = new Response();
		response.setData(true);

		Gson gson = new Gson();
		Response generatedJson = gson.fromJson(new Gson().toJson(response), Response.class);
		assertThat(generatedJson.getData(), equalTo(Boolean.TRUE));
	}

	@Test
	public void toString_should_return_a_json_with_value_of_data_equal_to_UserDto() {
		Response response = new Response();
		response.setData(user);

		Gson gson = new Gson();
        UserDto generatedJson = gson.fromJson(new Gson().toJson(response.getData()), UserDto.class);

		assertThat(generatedJson.getEmail(), equalTo(user.getEmail()));
		assertThat(generatedJson.getName(), equalTo(user.getName()));
		assertThat(generatedJson.getPassword(), equalTo(user.getPassword()));
		assertThat(generatedJson.getPhone(), equalTo(user.getPhone()));
		assertThat(generatedJson.getSurname(), equalTo(user.getSurname()));
	}

}
