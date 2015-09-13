package furman.pay.repository;

import furman.domain.Order;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * Created by akoiro on 9/13/15.
 */

public interface OrderRepository extends PagingAndSortingRepository<Order, Long>{
}
