package furman.pay.conroller;

import furman.core.model.CommonData;
import furman.pay.model.Work;
import furman.pay.model.WorkValue;
import org.apache.commons.math3.util.Precision;

import java.util.ArrayList;
import java.util.List;

/**
 * akoiro - 11/11/15.
 */
public class CreateWorkValues {

    private Iterable<Work> works;
    private Iterable<CommonData> commonDatas;

    private ArrayList<WorkValue> values = new ArrayList<>();

    public List<WorkValue> create() {
        works.forEach(work -> {
            WorkValue workValue = new WorkValue();
            workValue.setType(work.getCommonDataType());
            workValue.setDisplayName(work.getCommonDataType());
            workValue.setName(work.getCommonDataType());
            workValue.setValue(0.0);
            workValue.setWork(work);
            values.add(workValue);

            commonDatas.forEach(commonData -> {
                if (commonData.getType().equals(work.getCommonDataType())) {
                    List<String> names = work.getCommonDataNames();
                    names.forEach(name -> {
                        if (commonData.getName().matches(name)) {
                            workValue.setValue(Precision.round(workValue.getValue() + commonData.getCount(), 3));
                            workValue.setType(commonData.getType());
                            workValue.setDisplayName(commonData.getService());
                            workValue.setName(commonData.getName());
                        }
                    });
                }
            });
        });
        return values;
    }

    public static CreateWorkValues valueOf(Iterable<Work> works, Iterable<CommonData> commonDatas) {
        CreateWorkValues result = new CreateWorkValues();
        result.works = works;
        result.commonDatas = commonDatas;
        return result;
    }
}
