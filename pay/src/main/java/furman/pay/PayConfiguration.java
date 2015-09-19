package furman.pay;

import furman.pay.model.Employee;
import furman.pay.model.Shift;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

/**
 * Created by akoiro on 9/14/15.
 */
@Configuration
@EnableMongoRepositories(basePackages = "furman.pay.repository.")
public class PayConfiguration extends RepositoryRestConfigurerAdapter {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(Shift.class, Employee.class);
    }
}
