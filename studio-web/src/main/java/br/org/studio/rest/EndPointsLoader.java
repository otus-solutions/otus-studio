package br.org.studio.rest;

import java.util.HashSet;
import java.util.Set;

import javax.inject.Inject;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@ApplicationPath("studio")
public class EndPointsLoader extends Application {

    @Inject
    private UserResouce userResouce;

    @Inject
    private SystemConfigResource systemConfigResource;

    @Inject
    private AdministrationUsersResource administrationUsersResource;

    @Inject
    private AuthenticationResource authenticationResource;

    @Inject
    private RepositoryResource repositoryResource;

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new HashSet<Class<?>>();
        resources.add(UserResouce.class);
        resources.add(SystemConfigResource.class);
        resources.add(AdministrationUsersResource.class);
        resources.add(AuthenticationResource.class);
        resources.add(RepositoryResource.class);
        return resources;
    }

    @Override
    public Set<Object> getSingletons() {
        Set<Object> resources = new HashSet<Object>();
        resources.add(userResouce);
        resources.add(systemConfigResource);
        resources.add(administrationUsersResource);
        resources.add(authenticationResource);
        resources.add(repositoryResource);
        return resources;
    }

}
