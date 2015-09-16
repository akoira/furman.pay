package furman.pay.repository;

import furman.pay.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by akoiro on 9/14/15.
 */
@RepositoryRestResource(collectionResourceRel = "porder", path = "porders")
public interface OrderRepository extends MongoRepository<Order, Long>, QueryDslPredicateExecutor<Order> {
}
