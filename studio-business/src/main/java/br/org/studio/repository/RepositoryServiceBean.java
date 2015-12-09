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
import br.org.studio.exception.RepositoryNotFoundException;
import br.org.studio.exception.RepositoryOfflineException;
import br.org.studio.exceptions.DataNotFoundException;
import br.org.studio.rest.dtos.repository.RepositoryDto;
import br.org.studio.tool.RepositoryManagerFacade;
import br.org.studio.tool.base.repository.configuration.RepositoryConfiguration;
import br.org.studio.tool.mongodb.repository.MongoRepositoryConfiguration;
import br.org.tutty.Equalizer;

@Stateless
@Local(RepositoryService.class)
public class RepositoryServiceBean implements RepositoryService {

	@Inject
	private RepositoryDao repositoryDao;

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
	public void add(RepositoryDto repositoryDto) {
		Repository repository = new Repository();
		try {
			Equalizer.equalize(repositoryDto, repository);
			repositoryDao.persist(repository);

		} catch (IllegalAccessException | NoSuchFieldException e) {
			throw new ConvertedDtoException();
		}
	}

	@Override
	public void create(RepositoryDto repositoryDto) throws RepositoryOfflineException, SQLException {
		if (validateConnection(repositoryDto)) {
			buildRepositoryDatabase(repositoryDto);
			add(repositoryDto);
		} else {
			throw new RepositoryOfflineException();
		}
	}

	@Override
	public Boolean validateConnection(RepositoryDto repositoryDto) {
		// TODO implementar validação da conexão com a base de dados
		return Boolean.TRUE;
	}

	private void buildRepositoryDatabase(RepositoryDto repositoryDto) throws SQLException {
		RepositoryConfiguration configuration = MongoRepositoryConfiguration.create(repositoryDto.getDatabase(), repositoryDto.getHost(),
				String.valueOf(repositoryDto.getPort()), repositoryDto.getUsername(), repositoryDto.getPassword());

		RepositoryManagerFacade managerFacade = new RepositoryManagerFacade();

		try {
			managerFacade.createRepository(configuration);
		} catch (Exception e) {
			e.printStackTrace();
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
}
