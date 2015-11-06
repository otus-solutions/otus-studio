package br.org.studio.rest;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.when;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import br.org.studio.validation.EmailConstraint;

@RunWith(MockitoJUnitRunner.class)
public class UserResourceTest {

	@Mock
	private EmailConstraint emailConstraint;

	@InjectMocks
	private UserResouce resource;

	private Response trueResponse;
	private Response falseResponse;

	@Before
	public void setup() {
		trueResponse = new Response();
		trueResponse.setData(true);

		falseResponse = new Response();
		falseResponse.setData(false);
	}

	@Test
	public void userEmailExist_method_should_return_a_json_with_value_FALSE_for_property_data_when_email_is_unique() {
		when(emailConstraint.isUnique(anyString())).thenReturn(false);

		String restReturn = resource.userEmailExists(anyString());

		assertThat(trueResponse.toJson(), equalTo(restReturn));
	}

	@Test
	public void userEmailExist_method_should_return_a_json_with_value_TRUE_for_property_data_when_email_is_not_unique() {
		when(emailConstraint.isUnique(anyString())).thenReturn(true);

		String restReturn = resource.userEmailExists(anyString());

		assertThat(falseResponse.toJson(), equalTo(restReturn));
	}

}
