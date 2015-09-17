package furman.pay.repository;

import furman.pay.model.Employee;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.math.BigInteger;

/**
 * Created by akoiro on 9/15/15.
 */
@RepositoryRestResource(collectionResourceRel = "employee", path = "employee")
public interface EmployeeRepository extends MongoRepository<Employee, BigInteger>,
        QueryDslPredicateExecutor<Employee> {
}
