package furman;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.boot.context.embedded.ServletRegistrationBean;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

import javax.servlet.MultipartConfigElement;

/*
 * Copyright ish group pty ltd. All rights reserved. http://www.ish.com.au No copying or use of this code is allowed without permission in writing from ish.
 */
public abstract class AbstractModuleAutoConfiguration<T> {
    @Autowired
    protected ApplicationContext applicationContext;

    @Autowired
    protected ServerProperties server;

    @Autowired(required = false)
    protected MultipartConfigElement multipartConfig;

    @Value("${furman.rest.base-path}")
    protected String baseApiPath;

    protected DispatcherServlet createServlet() {
        AnnotationConfigWebApplicationContext webContext = new AnnotationConfigWebApplicationContext();
        webContext.setParent(applicationContext);
        webContext.register(getConfigurationClass());
        return new DispatcherServlet(webContext);
    }

    protected ServletRegistrationBean createRegistration(DispatcherServlet dispatcherServlet) {
        ServletRegistrationBean registration = new ServletRegistrationBean(
                dispatcherServlet,
                this.server.getServletMapping() + baseApiPath + "/" + getPath() + "/*");

        registration.setName(getServletBeanName());
        if (this.multipartConfig != null) {
            registration.setMultipartConfig(this.multipartConfig);
        }
        return registration;
    }

    protected abstract String getServletBeanName();

    protected abstract String getPath();

    protected abstract Class<T> getConfigurationClass();
}
