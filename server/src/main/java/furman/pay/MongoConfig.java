package furman.pay;

import com.mongodb.Mongo;
import com.mongodb.MongoClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;

/**
 * Created by akoiro on 6/1/14.
 */
@Configuration
@ConfigurationProperties(prefix = "mongodb")
public class MongoConfig extends AbstractMongoConfiguration {

    @Value(value = "${mongoDbName}")
    private String mongoDbName;

    @Value(value = "${mongoDbHost}")
    private String mongoDbHost;

    @Override
    protected String getDatabaseName() {
        return mongoDbName;
    }

    @Override
    @Bean
    public Mongo mongo() throws Exception {
        return new MongoClient(mongoDbHost);
    }
}
