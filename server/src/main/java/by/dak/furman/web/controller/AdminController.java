package by.dak.furman.web.controller;

import by.dak.furman.web.model.User;
import by.dak.furman.web.model.reporsitory.IUserReporsitory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by akoiro on 6/1/14.
 */
@Controller
public class AdminController {

    @Autowired
    private IUserReporsitory userReporsitory;

    @Transactional
    public void addUser(User user) {
        userReporsitory.save(user);
    }
}
