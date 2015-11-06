package br.org.studio.dao;

import br.org.studio.exceptions.DataNotFoundException;

import org.hibernate.Criteria;

import java.util.List;

public interface GenericDao {
    
    void persist(Object entity);

    Long count(Class<?> clazz);

    void update(Object entity);

    @SuppressWarnings("rawtypes")
	List listNotWaitingEmpty(Criteria criteria) throws DataNotFoundException;

    @SuppressWarnings("rawtypes")
	List list(Criteria criteria);

    Object uniqueResultNotWaitingEmpty(Criteria criteria) throws DataNotFoundException;

    Object uniqueResult(Criteria criteria);

    void remove(Object entity);
    
}
