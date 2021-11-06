package com.dotComIt.learnWith.vos;

import java.util.ArrayList;

public class ScheduleTaskBodyVO {
    private String taskIDList;
    public String getTaskIDList() {
        return taskIDList;
    }
    public void setTaskIDList(String taskIDList) {
        this.taskIDList = taskIDList;
    }
    private String dateScheduledAsUTCString;
    public String getDateScheduledAsUTCString() {
        return dateScheduledAsUTCString;
    }

    public void setDateScheduledAsUTCString(String dateScheduledAsUTCString) {
        this.dateScheduledAsUTCString = dateScheduledAsUTCString;
    }

}
