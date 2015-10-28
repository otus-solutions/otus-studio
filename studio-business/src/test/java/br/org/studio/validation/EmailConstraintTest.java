package br.org.studio.validation;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.when;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import br.org.studio.dao.UserDao;

@RunWith(MockitoJUnitRunner.class)
public class EmailConstraintTest {

	@Mock
	private UserDao dao;

	@InjectMocks
	private EmailConstraint emailConstraint;

	@Test
	public void isUnique_method_should_return_TRUE_when_the_email_already_exist_in_the_list() {
		when(dao.emailExists(anyString())).thenReturn(false);

		Boolean verificationResult = emailConstraint.isUnique(anyString());

		assertThat(verificationResult, equalTo(true));
	}

	@Test
	public void isUnique_method_should_return_FALSE_when_the_email_does_not_exist_in_the_list() {
		when(dao.emailExists(anyString())).thenReturn(true);

		Boolean verificationResult = emailConstraint.isUnique(anyString());

		assertThat(verificationResult, equalTo(false));
	}

}
