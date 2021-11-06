package com.dotComIt.learnWith.vos;
public class TaskVO {

    private int taskID;
    public int getTaskID() {
        return taskID;
    }
    public void setTaskID(int taskID) {
        this.taskID = taskID;
    }
    private String taskCategory;
    public String getTaskCategory() {
        return taskCategory;
    }
    public void setTaskCategory(String taskCategory) {
        this.taskCategory = taskCategory;
    }
    private boolean completed;
    public boolean isCompleted() {
        return completed;
    }
    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
    private String dateCompletedAsUTCString;
    public String getDateCompletedAsUTCString() {
        return dateCompletedAsUTCString;
    }
    public void setDateCompletedAsUTCString(String dateCompletedAsUTCString) {
        this.dateCompletedAsUTCString = dateCompletedAsUTCString;
    }
    private String dateCreatedAsUTCString;
    public String getDateCreatedAsUTCString() {
        return dateCreatedAsUTCString;
    }
    public void setDateCreatedAsUTCString(String dateCreatedAsUTCString) {
        this.dateCreatedAsUTCString = dateCreatedAsUTCString;
    }
    private String dateScheduledAsUTCString;
    public String getDateScheduledAsUTCString() {
        return dateScheduledAsUTCString;
    }
    public void setDateScheduledAsUTCString(String dateScheduledAsUTCString) {
        this.dateScheduledAsUTCString = dateScheduledAsUTCString;
    }
    private String description;
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    private int taskCategoryID;
    public int getTaskCategoryID() {
        return taskCategoryID;
    }
    public void setTaskCategoryID(int taskCategoryID) {
        this.taskCategoryID = taskCategoryID;
    }
    private int userID;
    public int getUserID() {
        return userID;
    }
    public void setUserID(int userID) {
        this.userID = userID;
    }
}
