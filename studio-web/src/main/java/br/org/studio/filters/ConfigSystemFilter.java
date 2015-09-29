package br.org.studio.filters;

import br.org.studio.configuration.SystemConfigService;

import javax.inject.Inject;
import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter(urlPatterns = "/login.html")
public class ConfigSystemFilter implements Filter{

    private static final String CONFIG_PAGE = "/config.html"; // TODO URL Pagina De Configuração

    @Inject
    private SystemConfigService systemConfig;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {}

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        if(systemConfig.isReady()){
            filterChain.doFilter(servletRequest, servletResponse);
            return;

        }else {
            HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
            HttpServletResponse httpServletResponse = (HttpServletResponse) servletResponse;

            String contextPath = httpServletRequest.getContextPath();
            httpServletResponse.sendRedirect(contextPath + CONFIG_PAGE);
        }
    }

    @Override
    public void destroy() {}
}