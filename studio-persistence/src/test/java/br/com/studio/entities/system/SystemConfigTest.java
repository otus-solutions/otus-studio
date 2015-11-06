package br.com.studio.entities.system;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;

import br.org.studio.entities.email.EmailSender;
import br.org.studio.entities.system.SystemConfig;

public class SystemConfigTest {

	@InjectMocks
	private SystemConfig systemConfig;

	@InjectMocks
	private EmailSender emailSender;
	
	@Before
	public void setUp(){
		systemConfig = new SystemConfig(emailSender);
	}

	@Test
	public void shouldTrueWhenFianlizeConfiguration() {
		systemConfig.finalizeConfiguration();
		assertEquals(systemConfig.isReady(), true);
	}

}
