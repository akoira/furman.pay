package furman.pay.changelogs;

import com.github.mongobee.changeset.ChangeLog;
import com.github.mongobee.changeset.ChangeSet;
import furman.pay.model.Service;
import org.springframework.data.mongodb.core.MongoTemplate;

/*
 * Copyright ish group pty ltd. All rights reserved. http://www.ish.com.au No copying or use of this code is allowed without permission in writing from ish.
 */
@ChangeLog(order = "001")
public class PredefinedEntities {
    @ChangeSet(order = "001", id = "createDefaultServices", author = "akoyro")
    public void createDefaultServices(MongoTemplate mongoTemplate) {
        mongoTemplate.save(Service.valueOf("cutting", "Распил", "м.п.", 0));
        mongoTemplate.save(Service.valueOf("directGlueing", "Оклейка прямолинейная", "м.п.", 1));
        mongoTemplate.save(Service.valueOf("curveGlueing", "Оклейка криволинейная", "м.п.", 2));
        mongoTemplate.save(Service.valueOf("milling", "Фрезеровка", "м.п.", 3));
        mongoTemplate.save(Service.valueOf("drilling", "Фрезеровка под петли", "шт.", 4));
        mongoTemplate.save(Service.valueOf("groove", "Паз", "м.п.", 5));
        mongoTemplate.save(Service.valueOf("angle", "Угол. распил", "м.п.", 6));
        mongoTemplate.save(Service.valueOf("patch", "Склейка", "м.кв.", 7));
        mongoTemplate.save(Service.valueOf("cutoff", "Срез", "м.п.", 8));
    }
}
