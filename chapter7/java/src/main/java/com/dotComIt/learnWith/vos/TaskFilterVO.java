package com.dotComIt.learnWith.vos;

public class TaskFilterVO {
    private int taskCategoryID;
    public int getTaskCategoryID() {
        return taskCategoryID;
    }
    public void setTaskCategoryID(int taskCategoryID) {
        this.taskCategoryID = taskCategoryID;
    }


    private int taskID;
    public int getTaskID() {
        return taskID;
    }
    public void setTaskID(int taskID) {
        this.taskID = taskID;
    }

    private Boolean completed;
    public Boolean getCompleted() {
        return completed;
    }
    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }
    private String endDateAsUTCString;
    public String getEndDateAsUTCString() {
        return endDateAsUTCString;
    }
    public void setEndDateAsUTCString(String endDateAsUTCString) {
        this.endDateAsUTCString = endDateAsUTCString;
    }

    private String startDateAsUTCString;
    public String getStartDateAsUTCString() {
        return startDateAsUTCString;
    }
    public void setStartDateAsUTCString(String startDateAsUTCString) {
        this.startDateAsUTCString = startDateAsUTCString;
    }

    private String scheduledEndDateAsUTCString;
    public String getScheduledEndDateAsUTCString() {
        return scheduledEndDateAsUTCString;
    }
    public void setScheduledEndDateAsUTCString(String scheduledEndDateAsUTCString) {
        this.scheduledEndDateAsUTCString = scheduledEndDateAsUTCString;
    }
    private String scheduledStartDateAsUTCString;
    public String getScheduledStartDateAsUTCString() {
        return scheduledStartDateAsUTCString;
    }
    public void setScheduledStartDateAsUTCString(String scheduledStartDateAsUTCString) {
        this.scheduledStartDateAsUTCString = scheduledStartDateAsUTCString;
    }

    private String scheduledEqualDateAsUTCString ;
    public String getScheduledEqualDateAsUTCString() {
        return scheduledEqualDateAsUTCString ;
    }
    public void setScheduledEqualDateAsUTCString(String scheduledEqualDateAsUTCString ) {
        this.scheduledEqualDateAsUTCString = scheduledEqualDateAsUTCString ;
    }

}
