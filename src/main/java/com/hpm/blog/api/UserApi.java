package com.hpm.blog.api;


import com.alibaba.fastjson.JSONObject;
import com.hpm.blog.annotation.LoginRequired;
import com.hpm.blog.model.User;
import com.hpm.blog.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserApi {
    private UserService userService;

    @Autowired
    public UserApi(UserService userService) {
        this.userService = userService;
    }

    // NEW FEATURE
    @GetMapping("/email/{email}")
    public Object findByEmail(@PathVariable String email) {
        if (userService.findByEmail(email) == null) {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("error","Invalid email");
            return jsonObject;
        }
        return userService.findByEmail(email);
    }

    @PostMapping("")
    public Object add(@RequestBody User user) {
        if (userService.findByName(user.getName()) != null) {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("error","Username has been occupied");
            return jsonObject;
        }
        return userService.add(user);
    }

    @PutMapping("")
    @LoginRequired
    public Object save(@RequestBody User user) {
        if (userService.findById(user.getId()) == null) {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("error","Invalid user id");
            return jsonObject;
        }
        return userService.save(user);
    }

    @GetMapping("{id}")
    public Object findById(@PathVariable int id) {
        if (id <= 0) {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("error","Invalid user id");
            return jsonObject;
        }
        return userService.findById(id);
    }
}
