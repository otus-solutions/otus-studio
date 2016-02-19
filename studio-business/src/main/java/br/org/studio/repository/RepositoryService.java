package br.org.studio.repository;

import java.sql.SQLException;
import java.util.List;

import br.org.studio.exception.RepositoryAlreadyExistException;
import br.org.studio.exception.RepositoryNotFoundException;
import br.org.studio.exception.RepositoryOfflineException;
import br.org.studio.rest.dtos.repository.RepositoryDto;

/**
 * Created by diogoferreira on 30/11/15.
 */
public interface RepositoryService {
    List<RepositoryDto> fetchRepository(String name) throws RepositoryNotFoundException;

    List<RepositoryDto> fetchAll() throws RepositoryNotFoundException;

    void connect(RepositoryDto repositoryDto);

    void create(RepositoryDto repositoryDto) throws RepositoryOfflineException, SQLException, RepositoryAlreadyExistException;

    Boolean validationDatabase(RepositoryDto repositoryDto);

    Boolean validationConnection(RepositoryDto repositoryDto);

	Boolean checkRepositoryCredentials(RepositoryDto repositoryDto);
}
