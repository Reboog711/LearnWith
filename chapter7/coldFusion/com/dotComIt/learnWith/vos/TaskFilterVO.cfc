<!---
  Created by jhouser on 5/12/2016.
--->
<cfcomponent displayname="TaskFilterVO"
        hint="I represent filter criteria for retrieving tasks."
        alias="com.dotcomit.learnWith.vos.TaskFilterVO">

    <cfproperty name="taskCategoryID" type="numeric" />
    <cfproperty name="completed" type="numeric" />
    <cfproperty name="endDate" type="date" />
    <cfproperty name="startDate" type="date" />

    <cfproperty name="scheduledEndDate" type="date" />
    <cfproperty name="scheduledEqualDate" type="date" />
    <cfproperty name="scheduledStartDate" type="date" />


</cfcomponent>
