package com.hpm.blog.model;

import java.util.List;

public class User {
    private Integer id; // 这里不用 int， 应为 int 自动初始化为0，mybatis mapper 文件 就不能使用 <if test="id!=null"> 了
    private String email;
    private String name;
    private String fullName;
    private String password;
    private String classTaken;
    private String funStuff;
    private String otherStuff;
    private String links;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getClassTaken() {
        return classTaken;
    }

    public void setClassTaken(String newClassTaken) {
        this.classTaken = newClassTaken;
    }

    public String getFunStuff() {
        return funStuff;
    }

    public void setFunStuff(String funStuff) {
        this.funStuff = funStuff;
    }

    public String getOtherStuff() {
        return otherStuff;
    }

    public void setOtherStuff(String otherStuff) {
        this.otherStuff = otherStuff;
    }

    public String getLinks() {
        return this.links;
    }

    public void setLinks(String links) {
        this.links = links;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
