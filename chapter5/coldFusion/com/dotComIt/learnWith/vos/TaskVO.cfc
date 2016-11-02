<!---
  Created by jhouser on 5/12/2016.
--->
<cfcomponent displayname="TaskVO" hint="I represent a single task."
        alias="com.dotcomit.learnWith.vos.TaskVO">
    <cfproperty name="category" type="String" />
    <cfproperty name="completed" type="Boolean" />
    <cfproperty name="dateCompleted" type="date" />
    <cfproperty name="dateCreated" type="date" />
    <cfproperty name="dateScheduled" type="date" />
    <cfproperty name="description" type="String" />
    <cfproperty name="taskCategoryID" type="numeric" />
    <cfproperty name="userID" type="numeric" />
</cfcomponent>
