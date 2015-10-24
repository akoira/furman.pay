package furman.pay.repository;

import furman.pay.model.PayCustomer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * akoiro - 10/23/15.
 */
@RepositoryRestResource(collectionResourceRel = "payCustomer", path = "payCustomer")
public interface PayCustomerRepository extends MongoRepository<PayCustomer, String>,
        QueryDslPredicateExecutor<PayCustomer> {
}
