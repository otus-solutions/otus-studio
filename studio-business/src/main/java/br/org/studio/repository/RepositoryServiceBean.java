package br.org.studio.repository;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

import javax.ejb.Local;
import javax.ejb.Stateless;
import javax.inject.Inject;

import br.org.studio.dao.RepositoryDao;
import br.org.studio.entities.repository.Repository;
import br.org.studio.exception.ConvertedDtoException;
import br.org.studio.exception.RepositoryAlreadyExistException;
import br.org.studio.exception.RepositoryNotFoundException;
import br.org.studio.exception.RepositoryOfflineException;
import br.org.studio.exceptions.DataNotFoundException;
import br.org.studio.rest.dtos.repository.RepositoryDto;
import br.org.studio.tool.RepositoryManagerFacade;
import br.org.studio.tool.base.repository.configuration.RepositoryConfiguration;
import br.org.studio.tool.mongodb.database.MongoConnector;
import br.org.studio.tool.mongodb.repository.MongoRepositoryConfiguration;
import br.org.tutty.Equalizer;

@Stateless
@Local(RepositoryService.class)
public class RepositoryServiceBean implements RepositoryService {

	@Inject
	private RepositoryDao repositoryDao;
	private RepositoryManagerFacade repositoryFacade;

	public RepositoryServiceBean() {
		repositoryFacade = new RepositoryManagerFacade();
	}

	@Override
	public List<RepositoryDto> fetchRepository(String name) throws RepositoryNotFoundException {
		try {
			List<Repository> repositories = repositoryDao.fetch(name);
			List<RepositoryDto> convertedRepositories = new ArrayList<>();

			repositories.stream().forEach(new Consumer<Repository>() {
				@Override
				public void accept(Repository repository) {
					RepositoryDto repositoryDto = new RepositoryDto();
					try {
						Equalizer.equalize(repository, repositoryDto);
						convertedRepositories.add(repositoryDto);
					} catch (IllegalAccessException | NoSuchFieldException e) {
					}
				}
			});

			return convertedRepositories;
		} catch (DataNotFoundException e) {
			throw new RepositoryNotFoundException();
		}
	}

	@Override
	public List<RepositoryDto> fetchAll() throws RepositoryNotFoundException {
		try {
			List<Repository> repositories = repositoryDao.fetchAll();
			List<RepositoryDto> convertedRepositories = new ArrayList<>();

			repositories.stream().forEach(new Consumer<Repository>() {
				@Override
				public void accept(Repository repository) {
					RepositoryDto repositoryDto = new RepositoryDto();
					try {
						Equalizer.equalize(repository, repositoryDto);
						convertedRepositories.add(repositoryDto);
					} catch (IllegalAccessException | NoSuchFieldException e) {
					}
				}
			});

			return convertedRepositories;
		} catch (DataNotFoundException e) {
			throw new RepositoryNotFoundException();
		}
	}

	@Override
	public void create(RepositoryDto repositoryDto)
			throws RepositoryOfflineException, SQLException, RepositoryAlreadyExistException {
		RepositoryConfiguration configuration = MongoRepositoryConfiguration.create(repositoryDto);

		if (validationConnection(repositoryDto)) {

			if (!validationDatabase(repositoryDto)) {
				repositoryFacade.createRepository(configuration);
				connect(repositoryDto);
			} else {
				throw new RepositoryAlreadyExistException();
			}

		} else {
			throw new RepositoryOfflineException();
		}
	}

	@Override
	public void connect(RepositoryDto repositoryDto) {
		Repository repository = new Repository();
		try {
			Equalizer.equalize(repositoryDto, repository);
			repositoryDao.persist(repository);

		} catch (IllegalAccessException | NoSuchFieldException e) {
			throw new ConvertedDtoException();
		}
	}

	@Override
	public Boolean validationDatabase(RepositoryDto repositoryDto) {
		try {
			RepositoryConfiguration configuration = MongoRepositoryConfiguration.create(repositoryDto);
			return repositoryFacade.existRepository(configuration);

		} catch (Exception e) {
			return Boolean.FALSE;
		}
	}

	@Override
	public Boolean validationConnection(RepositoryDto repositoryDto) {
		try {
			RepositoryConfiguration configuration = MongoRepositoryConfiguration.create(repositoryDto);
			return repositoryFacade.isRepositoryAccessible(configuration);

		} catch (Exception e) {
			return Boolean.FALSE;
		}
	}

	@Override
	public Boolean checkRepositoryCredentials(RepositoryDto repositoryDto) {
		RepositoryConfiguration configuration = MongoRepositoryConfiguration.create(repositoryDto);
		Boolean validCredentials = MongoConnector.getConnector(configuration.getHostName(), configuration.getPort())
				.isValidCredentials(configuration.getUser(), configuration.getPassword());
		return validCredentials;
	}

}
