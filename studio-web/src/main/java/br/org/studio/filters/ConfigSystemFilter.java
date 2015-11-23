package br.org.studio.filters;

import java.io.IOException;

import javax.inject.Inject;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import br.org.studio.configuration.SystemConfigService;

@WebFilter(urlPatterns = "/index.html")
public class ConfigSystemFilter implements Filter{

    private static final String CONFIG_PAGE = "/app/public/setting/register-adm.html";

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
