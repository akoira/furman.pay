package furman.pay.repository;

import furman.pay.model.day.DayShift;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by akoiro on 9/19/15.
 */
@RepositoryRestResource(collectionResourceRel = "dayShift", path = "dayShift")
public interface DayShiftRepository extends MongoRepository<DayShift, String>,
        QueryDslPredicateExecutor<DayShift> {
}
