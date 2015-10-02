package br.org.studio.configuration;

import br.org.studio.exception.FillUserExceltion;
import br.org.studio.rest.dtos.AdmDto;


/**
 * Created by diogoferreira on 28/09/15.
 */
public interface SystemConfigService {

    Boolean isReady();

	void createAdmin(AdmDto admDto) throws FillUserExceltion;
}
