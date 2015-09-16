package furman;

import furman.pay.PayConfiguration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.context.embedded.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.DispatcherServlet;

/*
 * Copyright ish group pty ltd. All rights reserved. http://www.ish.com.au No copying or use of this code is allowed without permission in writing from ish.
 */
@Configuration
@ConditionalOnClass(PayConfiguration.class)
public class PayAutoConfiguration extends AbstractModuleAutoConfiguration {
    public static final String SERVLET_NAME = "payServlet";
    public static final String REGISTRATION_NAME = "payRegistration";

    @Value("${furman.pay.path}")
    private String path;

    @Bean(name = SERVLET_NAME)
    public DispatcherServlet payServlet() {
        return createServlet();
    }

    @Bean(name = REGISTRATION_NAME)
    public ServletRegistrationBean payRegistration() {
        return createRegistration(payServlet());
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
        return PayConfiguration.class;
    }
}