package br.com.studio.entities.system;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.mockito.InjectMocks;

import br.org.studio.entities.system.SystemConfig;

public class SystemConfigTest {

	@InjectMocks
	private SystemConfig systemConfig = new SystemConfig();

	@Test
	public void shouldTrueWhenFianlizeConfiguration() {
		systemConfig.finalizeConfiguration();
		assertEquals(systemConfig.isReady(), true);
	}

}
