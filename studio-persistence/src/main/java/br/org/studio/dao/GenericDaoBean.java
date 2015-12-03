package br.org.studio.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.hibernate.Criteria;
import org.hibernate.NonUniqueResultException;
import org.hibernate.Session;
import org.hibernate.criterion.Projections;

import br.org.studio.exceptions.DataNotFoundException;

/**
 * Created by diogoferreira on 29/09/15.
 */

public abstract class GenericDaoBean implements GenericDao {

	@PersistenceContext(unitName = "StudioPool")
	protected EntityManager entityManager;

	@Override
	public void persist(Object entity) {
		entityManager.persist(entity);
	}

	public void merge(Object entity) {
		entityManager.merge(entity);
	}

	@Override
	public Long count(Class<?> clazz) {
		Criteria criteria = createCriteria(clazz);
		criteria.setProjection(Projections.rowCount());

		return (Long) criteria.uniqueResult();
	}

	@Override
	public void update(Object entity) {
		entityManager.persist(entityManager.merge(entity));
	}

	public Criteria createCriteria(Class<?> clazz) {
		return getSession().createCriteria(clazz);
	}

	public Criteria createCriteria(Class<?> clazz, String alias) {
		return getSession().createCriteria(clazz, alias);
	}

	public Session getSession() {
		return entityManager.unwrap(Session.class);
	}

	@Override
	public List listNotWaitingEmpty(Criteria criteria) throws DataNotFoundException {
		List result = criteria.list();

		if (result == null || result.isEmpty()) {
			throw new DataNotFoundException();
		} else {
			return result;
		}
	}

	@Override
	public List list(Criteria criteria) {
		return criteria.list();
	}

	@Override
	public Object uniqueResultNotWaitingEmpty(Criteria criteria) throws DataNotFoundException {
		Object result = criteria.uniqueResult();

		if (result == null) {
			throw new DataNotFoundException();
		} else {
			return result;
		}
	}

	@Override
	public Object uniqueResult(Criteria criteria) throws NonUniqueResultException {
		try {
			return criteria.uniqueResult();
		} catch (NonUniqueResultException e) {
			throw e;
		}
	}

	@Override
	public void remove(Object entity) {
		entityManager.remove(entityManager.merge(entity));
	}
}
