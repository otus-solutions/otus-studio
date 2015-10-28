package br.org.studio.dao;

public interface UserDao extends GenericDao {

    Boolean emailExists(String email);

}
