package by.dak.furman.web.controller;

import by.dak.furman.web.model.Detail;
import by.dak.furman.web.model.material.Code;
import by.dak.furman.web.model.material.Material;
import by.dak.furman.web.model.material.Type;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;

@Controller
public class DetailController {

    @RequestMapping("/detail/list")
    @ResponseBody
    public Page<Detail> getList(int page, int start, int limit) {
        int total = 12;
        ArrayList<Detail> details = new ArrayList<>();

        for (int i = start; i < Math.min(page*limit,total) ; i++) {
            Detail detail = new Detail();
            detail.setName("Деталь" + i);
            detail.setAmount(i+1);
            detail.setWidth(i+1000);
            detail.setLength(i+2000);
            Material material = new Material();
            material.setName("Материал"+1);

            Code code = new Code();
            code.setName("Код"+i);
            code.setCode(String.valueOf(i));
            material.setCode(code);

            Type type = new Type();
            type.setId((long)i);
            type.setName("Тип"+i);
            material.setType(type);


            detail.setMaterial(material);

            details.add(detail);
        }
        Page<Detail> result = new Page<>();
        result.setResult(details);
        result.setTotal(total);
        return result;
    }
}
