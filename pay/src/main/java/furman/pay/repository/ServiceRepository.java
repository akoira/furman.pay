package furman.pay.repository;

import furman.pay.model.Service;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * akoiro - 10/22/15.
 */
@RepositoryRestResource(collectionResourceRel = "service", path = "service")
public interface ServiceRepository extends MongoRepository<Service, String>, QueryDslPredicateExecutor<Service> {
}
