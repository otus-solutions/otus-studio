package br.org.studio.dao;

import javax.ejb.Stateless;

/**
 * Created by diogoferreira on 29/09/15.
 */
@Stateless
public interface SystemConfigDao extends GenericDao {
    Boolean isReady();
}
