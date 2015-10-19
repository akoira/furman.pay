package furman.core.repository;

import furman.core.model.CommonData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

/**
 * akoiro - 10/19/15.
 */
@Repository
@RepositoryRestResource(collectionResourceRel = "commonData", path = "commonData")
public interface CommonDataRepository extends JpaRepository<CommonData, Long>, QueryDslPredicateExecutor<CommonData>, JpaSpecificationExecutor {
}
