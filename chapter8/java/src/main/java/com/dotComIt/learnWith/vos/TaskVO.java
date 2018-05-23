package com.dotComIt.learnWith.vos;

import java.time.LocalDate;

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

    private LocalDate dateCompleted;
    public LocalDate getDateCompleted() {
        return dateCompleted;
    }

    public void setDateCompleted(LocalDate dateCompleted) {
        this.dateCompleted = dateCompleted;
    }

    private LocalDate dateCreated;
    public LocalDate getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(LocalDate dateCreated) {
        this.dateCreated = dateCreated;
    }

    private LocalDate dateScheduled;
    public LocalDate getDateScheduled() {
        return dateScheduled;
    }

    public void setDateScheduled(LocalDate dateScheduled) {
        this.dateScheduled = dateScheduled;
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
