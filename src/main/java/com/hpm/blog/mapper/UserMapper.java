package com.hpm.blog.mapper;

import com.hpm.blog.model.User;

public interface UserMapper {
    int add(User user);
    void save(User user);
    User findOne(User user);
}
