package com.dotComIt.learnWith.vos;

import java.time.LocalDate;

public class TaskFilterVO {

    private int taskCategoryID;
    public int getTaskCategoryID() {
        return taskCategoryID;
    }
    public void setTaskCategoryID(int taskCategoryID) {
        this.taskCategoryID = taskCategoryID;
    }

    private Boolean completed;
    public Boolean getCompleted() {
        return completed;
    }
    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

    private LocalDate endDate;
    public LocalDate getEndDate() {
        return endDate;
    }
    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    private LocalDate startDate;
    public LocalDate getStartDate() {
        return startDate;
    }
    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    private LocalDate scheduledEndDate;
    public LocalDate getScheduledEndDate() {
        return scheduledEndDate;
    }
    public void setScheduledEndDate(LocalDate scheduledEndDate) {
        this.scheduledEndDate = scheduledEndDate;
    }

    private LocalDate scheduledEqualDate;
    public LocalDate getScheduledEqualDate() {
        return scheduledEqualDate;
    }
    public void setScheduledEqualDate(LocalDate scheduledEqualDate) {
        this.scheduledEqualDate = scheduledEqualDate;
    }

    private LocalDate scheduledStartDate;
    public LocalDate getScheduledStartDate() {
        return scheduledStartDate;
    }
    public void setScheduledStartDate(LocalDate scheduledStartDate) {
        this.scheduledStartDate = scheduledStartDate;
    }
}
