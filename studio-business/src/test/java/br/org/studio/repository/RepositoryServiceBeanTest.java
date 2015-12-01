package br.org.studio.repository;

import br.org.studio.dao.RepositoryDaoBean;
import br.org.studio.rest.dtos.repository.RepositoryDto;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Matchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class RepositoryServiceBeanTest {
    @InjectMocks
    private RepositoryServiceBean repositoryServiceBean;

    @Mock
    private RepositoryDaoBean repositoryDaoBean;

    @Test
    public void add_should_persist_repository_data() {
        RepositoryDto repositoryDto = new RepositoryDto();

        repositoryServiceBean.add(repositoryDto);
        Mockito.verify(repositoryDaoBean).persist(Matchers.any());
    }
}
