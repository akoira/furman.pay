package furman.pay;

import furman.pay.model.Employee;
import furman.pay.model.Work;
import furman.pay.model.day.DayShift;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.mapping.event.ValidatingMongoEventListener;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

/**
 * Created by akoiro on 9/14/15.
 */
@Configuration
@EnableMongoRepositories(basePackages = "furman.pay.repository.")
public class PayConfiguration extends RepositoryRestConfigurerAdapter {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(DayShift.class,
                Employee.class,
                Work.class);
    }

    @Bean
    public ValidatingMongoEventListener validatingMongoEventListener() {
        return new ValidatingMongoEventListener(validator());
    }

    @Bean
    public LocalValidatorFactoryBean validator() {
        return new LocalValidatorFactoryBean();
    }
}
