package br.org.studio.configuration;

import javax.ejb.Local;
import javax.ejb.Stateless;
import java.io.Serializable;

/**
 * Created by diogoferreira on 28/09/15.
 */
@Stateless
@Local(SystemConfigService.class)
public class SystemConfigServiceBean implements SystemConfigService, Serializable{

    @Override
    public Boolean isReady(){
        // TODO CON-9 Buscar existencia de configuração previa.
        return false;
    }
}
