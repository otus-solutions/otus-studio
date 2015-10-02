package br.org.studio.configuration;

import br.org.studio.dao.SystemConfigDao;
import br.org.studio.entities.system.User;
import br.org.studio.exception.FillUserExceltion;
import br.org.studio.rest.dtos.AdmDto;
import br.org.tutty.Equalizer;

import javax.ejb.Local;
import javax.ejb.Stateless;
import javax.inject.Inject;

import java.io.Serializable;

/**
 * Created by diogoferreira on 28/09/15.
 */
@Stateless
@Local(SystemConfigService.class)
public class SystemConfigServiceBean implements SystemConfigService, Serializable{

	private static final long serialVersionUID = 212121713077555289L;

	@Inject
    private SystemConfigDao systemConfigDao;


    @Override
    public Boolean isReady(){
        return systemConfigDao.isReady();
    }
    
    @Override
    public void createAdmin(AdmDto admDto) throws FillUserExceltion{
    	try {
    		User user = new User();
			Equalizer.equalize(admDto, user);
			
			user.becomesAdm();
	    	systemConfigDao.persist(user);
		} catch (IllegalAccessException | NoSuchFieldException e) {
			throw new FillUserExceltion();
		}
    }
}
