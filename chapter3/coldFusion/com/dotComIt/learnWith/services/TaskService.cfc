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

            <cfif StructKeyExists(local.json,'startDate')>
                <cfif setWhere is true >where <cfset setWhere = 'false'></cfif>
                <cfif firstOne is true><cfset firstOne = false><cfelse>and</cfif>
                dateCreated >= <cfqueryparam cfsqltype="cf_sql_date"
                    value="#local.json['startDate']#">
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
            <cfif isDate(dataQuery.dateCreated)>
                <cfset local.tempObject['dateCreated'] = dateFormat(dataQuery.dateCreated,"mm/dd/yyyy") />
            </cfif>
            <cfif isDate(dataQuery.dateCompleted)>
                <cfset local.tempObject['dateCompleted'] = dateFormat(dataQuery.dateCompleted,"mm/dd/yyyy") />
            </cfif>
            <cfif isDate(dataQuery.dateScheduled)>
                <cfset local.tempObject['dateScheduled'] = dateFormat(dataQuery.dateScheduled,"mm/dd/yyyy") />
            </cfif>
            <cfset arrayAppend(local.results,local.tempObject)/>
            <cfset local.resultObject['error'] = 0/>
        </Cfoutput>

        <cfset local.resultObject['resultObject'] = local.results />
        <cfset local.resultString = convertToJSON(local.resultObject) />
        <cfreturn local.resultString>

    </cffunction>

</cfcomponent>
