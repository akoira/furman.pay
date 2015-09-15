package furman.pay;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;

/**
 * Created by akoiro on 9/14/15.
 */
@Configuration
@ConfigurationProperties(prefix = "pay")
@ComponentScan(basePackages = "furman.pay")
public class PayConfig extends RepositoryRestMvcConfiguration {
    @Value(value = "${pay.baseUri}")
    private String baseUri;

    @Override
    public RepositoryRestConfiguration config() {
        RepositoryRestConfiguration config = super.config();
        config.setBaseUri(baseUri);
        return config;
    }
}
