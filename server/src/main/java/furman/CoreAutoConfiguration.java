package furman;

/*
 * Copyright ish group pty ltd. All rights reserved. http://www.ish.com.au No copying or use of this code is allowed without permission in writing from ish.
 */

import furman.core.CoreConfiguration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.context.embedded.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.DispatcherServlet;

@Configuration
@ConditionalOnClass(CoreConfiguration.class)
public class CoreAutoConfiguration extends AbstractModuleAutoConfiguration {
    public static final String SERVLET_NAME = "coreServlet";
    public static final String REGISTRATION_NAME = "coreRegistration";

    @Value("${furman.core.path}")
    private String path;

    @Bean(name = SERVLET_NAME)
    public DispatcherServlet coreServlet() {
        return createServlet();
    }

    @Bean(name = REGISTRATION_NAME)
    public ServletRegistrationBean coreRegistration() {
        return createRegistration(coreServlet());
    }

    @Override
    protected String getServletBeanName() {
        return SERVLET_NAME;
    }

    @Override
    protected String getPath() {
        return path;
    }

    @Override
    protected Class getConfigurationClass() {
        return CoreAutoConfiguration.class;
    }
}
