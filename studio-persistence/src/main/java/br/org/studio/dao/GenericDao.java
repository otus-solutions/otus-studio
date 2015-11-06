package br.org.studio.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.NonUniqueResultException;

import br.org.studio.exceptions.DataNotFoundException;

public interface GenericDao {
    
	void persist(Object entity);

	Long count(Class<?> clazz);

	void update(Object entity);

	List listNotWaitingEmpty(Criteria criteria) throws DataNotFoundException;

	List list(Criteria criteria);

	Object uniqueResultNotWaitingEmpty(Criteria criteria) throws DataNotFoundException;

	Object uniqueResult(Criteria criteria) throws NonUniqueResultException;

	void remove(Object entity);

}
