package br.org.studio.dao;

import br.org.studio.entities.system.SystemConfig;
import br.org.studio.exceptions.DataNotFoundException;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;

import javax.ejb.Local;
import javax.ejb.Stateless;

/**
 * Created by diogoferreira on 29/09/15.
 */
@Stateless
@Local(SystemConfigDao.class)
public class SystemConfigDaoBean extends GenericDaoBean implements GenericDao, SystemConfigDao{

    @Override
    public Boolean isReady(){
        Criteria criteria = createCriteria(SystemConfig.class);

        criteria.add(Restrictions.eq("ready", true));

        try {
            uniqueResultNotWaitingEmpty(criteria);
            return true;

        } catch (DataNotFoundException e) {
            return false;
        }
    }
}
