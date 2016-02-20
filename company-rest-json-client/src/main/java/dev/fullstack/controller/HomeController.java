package dev.fullstack.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

    @RequestMapping(value = {"/", "/companies", "/company", "/company/**", "/owners", "/owner", "/owner/**", "/home", "/home/**"})
    public String index() {
        return "index";
    }
}
