package br.org.studio.configuration;

import br.org.studio.dao.SystemConfigDao;

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

    @Inject
    private SystemConfigDao systemConfigDao;


    @Override
    public Boolean isReady(){
        return systemConfigDao.isReady();
    }
}
