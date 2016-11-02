<!---
  Created by jhouser on 5/12/2016.
--->
<cfcomponent displayname="TaskService"
        hint="I handle task related service calls">

    <cffunction name="convertToJSON" returnformat="plain" access="public">
        <cfargument name="value" type="any" required="true"/>
        <cfset local.resultString = SerializeJSON(arguments.value) />
        <cfif isDefined('url.callback')>
            <cfset local.resultString =url.callback & "(" &local.resultString &");"/>
        </cfif>
        <cfreturn local.resultString>
    </cffunction>


    <cffunction name="getFilteredTasks" returnformat="plain" access="remote"
            output="true"
            hint="I retrieve tasks from the db that meet the criteria.">
        <cfargument name="filter" type="String" required="true" hint="I am a JSON Packet that represents a TaskFilterVO"/>

        <cfset local.json = deserializeJSON(arguments.filter)/>

        <cfset setWhere = 'true' />
        <cfset firstOne = 'true' />

        <cfquery datasource="#application.dsn#" name="local.dataQuery" >
            select *
            from tasks join taskCategories on (tasks.taskCategoryID = taskCategories.taskCategoryID)

            <cfif StructKeyExists(local.json,'completed')>
                <cfif setWhere is true >where <cfset setWhere = 'false'></cfif>
                <cfif firstOne is true><cfset firstOne = false><cfelse>and</cfif>
                <cfif local.json['completed'] is 0>
                    completed = <cfqueryparam cfsqlType="cf_sql_bit" value="0">
                <cfelse>
                    completed = <cfqueryparam cfsqlType="cf_sql_bit" value="1">
                </cfif>
            </cfif>

<!---
<cfif StructKeyExists(local.json,'taskID')>
    <cfif setWhere is true >where <cfset setWhere = 'false'></cfif>
    <cfif firstOne is true><cfset firstOne = false><cfelse>and</cfif
            taskID = <cfqueryparam cfsqltype="cf_sql_numeric" value="#local.json['taskID']#">
</cfif>
--->

            <cfif StructKeyExists(local.json,'taskCategoryID') and
            local.json['taskCategoryID'] NEQ 0>
                <cfif setWhere is true >where <cfset setWhere = 'false'></cfif>
                <cfif firstOne is true><cfset firstOne = false><cfelse>and</cfif>
                taskCategories.taskCategoryID = <cfqueryparam cfsqltype="cf_sql_integer" value="#local.json['taskCategoryID']#">
            </cfif>

            <cfif StructKeyExists(local.json,'startDate')>
                <cfif setWhere is true >where <cfset setWhere = 'false'></cfif>
                <cfif firstOne is true><cfset firstOne = false><cfelse>and</cfif>
                dateCreated >= <cfqueryparam cfsqltype="cf_sql_date"
                    value="#local.json['startDate']#">
            </cfif>

            <cfif StructKeyExists(local.json,'endDate')>
                <cfif setWhere is true >where <cfset setWhere = 'false'></cfif>
                <cfif firstOne is true><cfset firstOne = false><cfelse>and</cfif>
                dateCreated <= <cfqueryparam cfsqlType="cf_sql_date"
                    value="#local.json['endDate']#">
            </cfif>

            <cfif StructKeyExists(local.json,'scheduledStartDate')>
                <cfif setWhere is true >where <cfset setWhere = 'false'></cfif>
                <cfif firstOne is true><cfset firstOne = false><cfelse>and</cfif>
                dateScheduled >= <cfqueryparam cfsqltype="cf_sql_date" value="#local.json['scheduledStartDate']#">
            </cfif>
            <cfif StructKeyExists(local.json,'scheduledEndDate')>
                <cfif setWhere is true >where <cfset setWhere = 'false'></cfif>
                <cfif firstOne is true><cfset firstOne = false><cfelse>and</cfif>
                dateScheduled <= <cfqueryparam cfsqlType="cf_sql_date" value="#local.json['scheduledEndDate']#">
            </cfif>


            order by dateCreated
        </cfquery>

        <cfset local.resultObject = createObject('component','#application.componentPrefix#com.dotComIt.learnWith.vos.ResultObjectVO')/>
        <cfset local.results = arrayNew(1) />

        <cfoutput query="local.dataQuery">
            <cfset local.tempObject = createObject('component','#application.componentPrefix#com.dotComIt.learnWith.vos.TaskVO')/>
            <cfset local.tempObject['taskID'] = dataQuery.taskID />
            <cfset local.tempObject['taskCategoryID'] = dataQuery.taskCategoryID />
            <cfset local.tempObject['taskCategory'] = dataQuery.taskcategory />
            <cfset local.tempObject['userID'] = dataQuery.userID />
            <cfset local.tempObject['description'] = dataQuery.description />
            <cfset local.tempObject['completed'] = dataQuery.completed />
            <cfset local.tempObject['dateCreated'] = dateFormat(dataQuery.dateCreated,"mm/dd/yyyy") />
            <cfset local.tempObject['dateCompleted'] = dateFormat(dataQuery.dateCompleted,"mm/dd/yyyy") />
            <cfset local.tempObject['dateScheduled'] = dateFormat(dataQuery.dateScheduled,"mm/dd/yyyy") />
            <cfset arrayAppend(local.results,local.tempObject)/>
            <cfset local.resultObject['error'] = 0/>
        </Cfoutput>

        <cfset local.resultObject['resultObject'] = local.results />
        <cfset local.resultString = convertToJSON(local.resultObject) />
        <cfreturn local.resultString>

    </cffunction>

    <cffunction name="getTaskCategories" returnformat="plain" access="remote"
            output="true" required="true" hint="I retrieve task Categories" >
        <cfquery datasource="#application.dsn#" name="local.dataQuery" >
            select * from taskCategories
            order by taskCategory
        </cfquery>

        <cfset local['resultObject'] = createObject('component','#application.componentPrefix#com.dotComIt.learnWith.vos.ResultObjectVO') />
        <cfset local.results = arrayNew(1) />

        <cfset local.tempObject = createObject('component', '#application.componentPrefix#com.dotComIt.learnWith.vos.TaskCategoryVO')/>
        <cfset local.tempObject['taskCategoryID'] = 0 />
        <cfset local.tempObject['taskCategory'] = "All Categories" />
        <cfset arrayAppend(local.results,local.tempObject)/>

        <Cfoutput query="local.dataQuery">
            <cfset local.tempObject = createObject('component', '#application.componentPrefix#com.dotComIt.learnWith.vos.TaskCategoryVO')/>
            <cfset local.tempObject['taskCategoryID'] = dataQuery.taskCategoryID />
            <cfset local.tempObject['taskCategory'] = dataQuery.taskCategory />
            <cfset arrayAppend(local.results,local.tempObject)/>
        </Cfoutput>

        <cfset local.resultObject['resultObject'] = local.results />
        <cfset local.resultObject['error'] = false/>
        <cfset local.resultString = convertToJSON(local.resultObject) />
        <cfreturn local.resultString>

    </cffunction>


</cfcomponent>
