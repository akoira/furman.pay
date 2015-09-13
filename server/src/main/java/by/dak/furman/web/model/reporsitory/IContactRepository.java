package by.dak.furman.web.model.reporsitory;

import by.dak.furman.web.model.Contact;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by akoiro on 6/1/14.
 */
public interface IContactRepository extends MongoRepository<Contact, Long> {
}
