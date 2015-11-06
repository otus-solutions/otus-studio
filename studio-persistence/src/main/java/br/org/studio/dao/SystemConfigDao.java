package br.org.studio.dao;

import javax.ejb.Stateless;

import br.org.studio.entities.email.EmailSender;
import br.org.studio.exceptions.DataNotFoundException;

/**
 * Created by diogoferreira on 29/09/15.
 */
@Stateless
public interface SystemConfigDao extends GenericDao {
    Boolean isReady();

	EmailSender findEmailSender() throws DataNotFoundException;
}
