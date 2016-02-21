package management.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.security.Principal;

@Controller
public class HomeController {

    /**
     * This is a trick to check whether the client has authenticated with server or not
     * If client has not authenticated yet, login page will be rendered automatically by spring security and no user data return
     *
     */
    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public
    @ResponseBody
    Principal user(Principal user) {
        return user;
    }
}
