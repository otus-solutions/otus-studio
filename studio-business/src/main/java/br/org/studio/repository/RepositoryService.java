package br.org.studio.repository;

import br.org.studio.exception.RepositoryNotFoundException;
import br.org.studio.exception.RepositoryOfflineException;
import br.org.studio.rest.dtos.repository.RepositoryDto;

import java.sql.SQLException;
import java.util.List;

/**
 * Created by diogoferreira on 30/11/15.
 */
public interface RepositoryService {
    List<RepositoryDto> fetchRepository(String name) throws RepositoryNotFoundException;

    void add(RepositoryDto repositoryDto);

    void create(RepositoryDto repositoryDto) throws RepositoryOfflineException, SQLException;

    Boolean validateConnection(RepositoryDto repositoryDto);
}
