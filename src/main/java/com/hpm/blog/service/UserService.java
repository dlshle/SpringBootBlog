package com.hpm.blog.service;


import com.hpm.blog.mapper.UserMapper;
import com.hpm.blog.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Service
public class UserService {
    private UserMapper userMapper;

    @Autowired
    public UserService(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    public User add(User user) {
        String passwordHash =  passwordToHash(user.getPassword());
        user.setPassword(passwordHash);
        userMapper.add(user);
        return findById(user.getId());
    }

    public User save(User user) {
        // only save hashed password
        if (user.getPassword() != null)
            user.setPassword(passwordToHash(user.getPassword()));
        userMapper.save(user);
        return findByName(user.getName());
    }

    private String passwordToHash(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            digest.update(password.getBytes());
            byte[] src = digest.digest();
            StringBuilder stringBuilder = new StringBuilder();
            for (byte aSrc : src) {
                String s = Integer.toHexString(aSrc & 0xFF);
                if (s.length() < 2) {
                    stringBuilder.append('0');
                }
                stringBuilder.append(s);
            }
            return stringBuilder.toString();
        } catch (NoSuchAlgorithmException ignore) {
        }
        return null;
    }

    public User findById(int id) {
        User user = new User();
        user.setId(id);
        return userMapper.findOne(user);
    }

    public User findByName(String name) {
        User param = new User();
        param.setName(name);
        return userMapper.findOne(param);
    }

    // NEW FEATURE
    public User findByEmail(String email) {
        User param = new User();
        param.setEmail(email);
        return userMapper.findOne(param);
    }

    public boolean comparePassword(User user, User userInDataBase) {
        return passwordToHash(user.getPassword()).equals(userInDataBase.getPassword());
    }
}
