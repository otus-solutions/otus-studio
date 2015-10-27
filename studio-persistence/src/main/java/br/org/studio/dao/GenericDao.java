package br.org.studio.dao;

import java.util.List;

import org.hibernate.Criteria;

import br.org.studio.exceptions.DataNotFoundException;

/**
 * Created by diogoferreira on 29/09/15.
 */

public interface GenericDao {
    void persist(Object entity);

    Long count(Class<?> clazz);

    void update(Object entity);

    List listNotWaitingEmpty(Criteria criteria) throws DataNotFoundException;

    List list(Criteria criteria);

    Object uniqueResultNotWaitingEmpty(Criteria criteria) throws DataNotFoundException;

    Object uniqueResult(Criteria criteria);

    void remove(Object entity);
}
