package furman.pay.repository.day;

import furman.pay.model.day.DayOrder;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by akoiro on 9/19/15.
 */
@RepositoryRestResource(collectionResourceRel = "dayOrder", path = "dayOrder")
public interface DayOrderRepository extends MongoRepository<DayOrder, String>,
        QueryDslPredicateExecutor<DayOrder> {

}
