import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import furman.pay.changelogs.PredefinedEntities;
import furman.pay.model.Work;
import org.apache.commons.io.IOUtils;
import org.junit.Test;

import java.io.InputStream;

/*
 * Copyright ish group pty ltd. All rights reserved. http://www.ish.com.au No copying or use of this code is allowed without permission in writing from ish.
 */
public class WorksFromJsonTest {

    @Test
    public void test() throws Exception {
        InputStream inputStream = null;
        try {
            inputStream = PredefinedEntities.class.getClassLoader().getResourceAsStream("works.json");
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(inputStream);
            jsonNode.forEach(node -> {
                try {
                    objectMapper.treeToValue(node, Work.class);
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
