package com.dotComIt.learnWith.vos;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class UserVO {
    public UserVO(){
    }

    private int userID;
    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }


    private String username;
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }


    private int roleID;
    public int getRoleID() {
        return roleID;
    }

    public void setRoleID(int roleID) {
        this.roleID = roleID;
    }

    private String password;
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }



}
