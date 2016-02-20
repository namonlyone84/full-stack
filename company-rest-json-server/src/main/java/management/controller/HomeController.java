package management.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.security.Principal;

@Controller
public class HomeController {

    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public @ResponseBody
    Principal user(Principal user) {
        return user;
    }

}
