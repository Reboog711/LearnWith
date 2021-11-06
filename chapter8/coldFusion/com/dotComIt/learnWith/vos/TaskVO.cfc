<cfcomponent displayname="TaskVO" hint="I represent a single task."
        alias="com.dotcomit.learnWith.vos.TaskVO">
    <cfproperty name="category" type="String" />
    <cfproperty name="completed" type="Boolean" />
    <cfproperty name="dateCompletedAsUTCString" type="string" />
    <cfproperty name="dateCreatedAsUTCString" type="string" />
    <cfproperty name="dateScheduledAsUTCString" type="string" />
    <cfproperty name="description" type="String" />
    <cfproperty name="taskCategoryID" type="numeric" />
    <cfproperty name="userID" type="numeric" />
</cfcomponent>
