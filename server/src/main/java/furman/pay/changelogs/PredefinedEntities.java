package furman.pay.changelogs;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.mongobee.changeset.ChangeLog;
import com.github.mongobee.changeset.ChangeSet;
import furman.pay.model.Work;
import org.apache.commons.io.IOUtils;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.io.InputStream;

/*
 * Copyright ish group pty ltd. All rights reserved. http://www.ish.com.au No copying or use of this code is allowed without permission in writing from ish.
 */
@ChangeLog(order = "001")
public class PredefinedEntities {
    @ChangeSet(order = "001", id = "createDefaultWorks", author = "akoyro")
    public void createDefaultWorks(MongoTemplate mongoTemplate) {

        InputStream inputStream = null;
        try {
            inputStream = PredefinedEntities.class.getClassLoader().getResourceAsStream("works.json");
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(inputStream);
            jsonNode.forEach(node -> {
                try {
                    Work work = objectMapper.treeToValue(node, Work.class);
                    mongoTemplate.insert(work);
                } catch (JsonProcessingException e) {
                    throw new IllegalArgumentException(e);
                }
            });
        } catch (Exception e) {
            throw new IllegalArgumentException(e);
        } finally {
            IOUtils.closeQuietly(inputStream);
        }
    }

    @ChangeSet(order = "002", id = "addTouchWork", author = "akoyro")
    public void addTouchWork(MongoTemplate mongoTemplate) {

        InputStream inputStream = null;
        try {
            inputStream = PredefinedEntities.class.getClassLoader().getResourceAsStream("works.json");
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(inputStream);
            jsonNode.forEach(node -> {
                try {
                    Work work = objectMapper.treeToValue(node, Work.class);
                    if (work.getType().equals("touch")) {
                        mongoTemplate.insert(work);
                    }
                } catch (JsonProcessingException e) {
                    throw new IllegalArgumentException(e);
                }
            });
        } catch (Exception e) {
            throw new IllegalArgumentException(e);
        } finally {
            IOUtils.closeQuietly(inputStream);
        }
    }
}
