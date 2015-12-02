package furman.core;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import furman.core.model.Order;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.autoconfigure.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;

import javax.sql.DataSource;
import java.util.List;

/**
 * Created by akoiro on 9/14/15.
 */
@Configuration
@EnableJpaRepositories(basePackages = "furman.core.repository", entityManagerFactoryRef = "mysqlEntityManager")
public class CoreConfiguration extends RepositoryRestMvcConfiguration{
    @Bean
    @ConfigurationProperties(prefix = "furman.core.datasource")
    public DataSource mysqlDataSource() {
        return DataSourceBuilder
                .create()
                .build();
    }


    @Bean(name = "mysqlEntityManager")
    public LocalContainerEntityManagerFactoryBean mysqlEntityManagerFactory(
            EntityManagerFactoryBuilder builder) {
        return builder.dataSource(mysqlDataSource())
                .packages("furman.core.model")
                .build();
    }

    @Override
    public void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
        for (HttpMessageConverter<?> converter : converters) {
            if (converter instanceof MappingJackson2HttpMessageConverter) {
                MappingJackson2HttpMessageConverter jsonMessageConverter = (MappingJackson2HttpMessageConverter) converter;
                ObjectMapper objectMapper = jsonMessageConverter.getObjectMapper();
                objectMapper.enable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
                break;
            }
        }
    }


    @Override
    public RepositoryRestConfiguration config() {
        RepositoryRestConfiguration configuration = super.config();
        configuration.exposeIdsFor(Order.class);
        return configuration;
    }
}
