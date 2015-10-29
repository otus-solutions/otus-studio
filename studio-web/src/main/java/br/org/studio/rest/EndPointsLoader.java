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
    private AdministrationUsersResource administrationUsersResource;

	@Override
	public Set<Class<?>> getClasses() {
		Set<Class<?>> resources = new HashSet<Class<?>>();
		resources.add(UserResouce.class);
        resources.add(AdministrationUsersResource.class);
		return resources;
	}

	@Override
	public Set<Object> getSingletons() {
		Set<Object> resources = new HashSet<Object>();
		resources.add(userResouce);
        resources.add(administrationUsersResource);
		return resources;
	}

}
