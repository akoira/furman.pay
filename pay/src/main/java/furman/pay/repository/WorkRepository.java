package furman.pay.repository;

import furman.pay.model.Work;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * akoiro - 10/22/15.
 */
@RepositoryRestResource(collectionResourceRel = "work", path = "work")
public interface WorkRepository extends MongoRepository<Work, String>, QueryDslPredicateExecutor<Work> {
}
