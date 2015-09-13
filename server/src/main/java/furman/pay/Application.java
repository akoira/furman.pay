package furman.pay;

import furman.domain.Order;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.orm.jpa.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * User: akoyro
 * Date: 2/11/14
 * Time: 7:33 PM
 */

@ComponentScan(basePackages = {"furman.pay", "furman.domain"})
@EnableJpaRepositories(basePackages = {"furman.pay", "furman.domain"})
@EntityScan("furman.domain")
@EnableAutoConfiguration
@SpringBootApplication
public class Application
{
    public static void main(String[] args)
    {
        SpringApplication.run(Application.class, args);
    }
}
