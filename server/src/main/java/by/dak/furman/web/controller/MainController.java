package by.dak.furman.web.controller;

import by.dak.furman.web.model.Main;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * User: akoyro
 * Date: 2/11/14
 * Time: 7:46 PM
 */
@Controller
public class MainController
{
    @RequestMapping("/")
    public String home()
    {
        return "home";
    }

    @RequestMapping("/main")
    public
    @ResponseBody
    Main getMain()
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Main main = new Main();
        main.setAuthenticated(authentication != null &&
                !(authentication instanceof AnonymousAuthenticationToken) &&
                authentication.isAuthenticated());
        return main;
    }

    @RequestMapping(value = "/main/login", method = RequestMethod.POST)
    public
    @ResponseBody
    boolean login(@RequestParam("user") String user, @RequestParam("password") String password)
    {
        return true;
    }


}
