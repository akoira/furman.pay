package furman.pay.changelogs;

import com.github.mongobee.changeset.ChangeLog;
import com.github.mongobee.changeset.ChangeSet;
import furman.pay.model.Work;
import org.springframework.data.mongodb.core.MongoTemplate;

/*
 * Copyright ish group pty ltd. All rights reserved. http://www.ish.com.au No copying or use of this code is allowed without permission in writing from ish.
 */
@ChangeLog(order = "001")
public class PredefinedEntities {
    @ChangeSet(order = "001", id = "createDefaultServices", author = "akoyro")
    public void createDefaultServices(MongoTemplate mongoTemplate) {
        mongoTemplate.insert(Work.valueOf("cutting", "Распил", "м.п.", 0));
        mongoTemplate.insert(Work.valueOf("directGlueing", "Оклейка прямолинейная", "м.п.", 1));
        mongoTemplate.insert(Work.valueOf("curveGlueing", "Оклейка криволинейная", "м.п.", 2));
        mongoTemplate.insert(Work.valueOf("milling", "Фрезеровка", "м.п.", 3));
        mongoTemplate.insert(Work.valueOf("drilling", "Фрезеровка под петли", "шт.", 4));
        mongoTemplate.insert(Work.valueOf("groove", "Паз", "м.п.", 5));
        mongoTemplate.insert(Work.valueOf("angle", "Угол. распил", "м.п.", 6));
        mongoTemplate.insert(Work.valueOf("patch", "Склейка", "м.кв.", 7));
        mongoTemplate.insert(Work.valueOf("cutoff", "Срез", "м.п.", 8));
        mongoTemplate.insert(Work.valueOf("zfacadeService", "П-во Z-фасада", "шт.", 9));
        mongoTemplate.insert(Work.valueOf("agtfacadeService", "П-во AGT-фасада", "шт.", 10));
    }
}
