package by.dak.furman.web.model.reporsitory;

import by.dak.furman.web.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by akoiro on 6/1/14.
 */
@Transactional
public interface IUserReporsitory extends MongoRepository<User, Long> {
}
