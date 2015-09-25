package furman.core.repository;

import furman.core.model.DateWithOrderCount;
import furman.core.model.Order;
import furman.core.model.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

/**
 * Created by akoiro on 9/13/15.
 */

@Repository
@RepositoryRestResource(collectionResourceRel = "order", path = "order")
public interface OrderRepository extends JpaRepository<Order, Long>, QueryDslPredicateExecutor<Order>, JpaSpecificationExecutor {

    @Query(value = "select new furman.core.model.DateWithOrderCount(count(o), date(o.workedDailySheet.date)) from Order o where o.status = :orderStatus group by date(o.workedDailySheet.date)")
    Iterable<DateWithOrderCount> getCountsPerDay(@Param(value = "orderStatus") OrderStatus orderStatus);
}
