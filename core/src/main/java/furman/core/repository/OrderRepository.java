package furman.core.repository;

import furman.core.model.Order;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by akoiro on 9/13/15.
 */

@RepositoryRestResource(collectionResourceRel = "order", path = "order")
public interface OrderRepository extends PagingAndSortingRepository<Order, Long>, QueryDslPredicateExecutor<Order> {
}
