package by.dak.furman.web.controller.material;

import by.dak.furman.web.model.material.Type;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

@Controller
public class TypeController {

    @RequestMapping("/material/type/list")
    @ResponseBody
    public List<Type> getList() {
        ArrayList<Type> types = new ArrayList<>();

        for (int i = 0; i < 100; i++) {
            Type type = new Type();
            type.setName("Тип" + i);
            type.setId((long) i);
            types.add(type);
        }
        return types;
    }
}
