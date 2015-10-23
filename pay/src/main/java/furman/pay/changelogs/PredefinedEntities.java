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
        mongoTemplate.insert(Service.valueOf("cutting", "Распил", "м.п.", 0));
        mongoTemplate.insert(Service.valueOf("directGlueing", "Оклейка прямолинейная", "м.п.", 1));
        mongoTemplate.insert(Service.valueOf("curveGlueing", "Оклейка криволинейная", "м.п.", 2));
        mongoTemplate.insert(Service.valueOf("milling", "Фрезеровка", "м.п.", 3));
        mongoTemplate.insert(Service.valueOf("drilling", "Фрезеровка под петли", "шт.", 4));
        mongoTemplate.insert(Service.valueOf("groove", "Паз", "м.п.", 5));
        mongoTemplate.insert(Service.valueOf("angle", "Угол. распил", "м.п.", 6));
        mongoTemplate.insert(Service.valueOf("patch", "Склейка", "м.кв.", 7));
        mongoTemplate.insert(Service.valueOf("cutoff", "Срез", "м.п.", 8));
    }
}
