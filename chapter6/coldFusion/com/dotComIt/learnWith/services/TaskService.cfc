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

            <cfif StructKeyExists(local.json,'taskID')>
                <cfif setWhere is true >where <cfset setWhere = 'false'></cfif>
                <cfif firstOne is true><cfset firstOne = false><cfelse>and</cfif>
                        taskID = <cfqueryparam cfsqltype="cf_sql_numeric" value="#local.json['taskID']#">
            </cfif>

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

            <cfif StructKeyExists(local.json,'scheduledEqualDate')>
                <cfif setWhere is true >where <cfset setWhere = 'false'></cfif>
                <cfif firstOne is true><cfset firstOne = false><cfelse>and</cfif>
                dateScheduled = <cfqueryparam cfsqlType="cf_sql_date" value="#local.json['scheduledEqualDate']#">
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

    <cffunction name="createTask" returnformat="plain"
            access="remote" output="true"
            required="true" hint="I save, or update, a single task." >
        <cfargument name="taskCategoryID" type="numeric" required="true" />
        <cfargument name="userID" type="numeric" required="true" />
        <cfargument name="description" type="String" required="true" />

        <cfquery datasource="#application.dsn#" name="local.dataQuery" >
              insert into tasks(
                taskCategoryID, userID, description, completed, dateCreated
              ) values(
              <cfif taskCategoryID NEQ 0>
                        <cfqueryparam value="#arguments.taskCategoryID#" cfsqltype="cf_sql_integer" >,
              <cfelse>
                        <cfqueryparam null="true" cfsqltype="cf_sql_integer" >,
              </cfif>
              <cfqueryparam value="#arguments.userID#" cfsqltype="cf_sql_integer" >,
              <cfqueryparam value="#arguments.description#" cfsqltype="cf_sql_varchar" >,
              <cfqueryparam value="0" cfsqltype="cf_sql_bit" >,
              <cfqueryparam value="#createODBCDateTime(now())#" cfsqltype="cf_sql_timestamp" >
              )
              SELECT SCOPE_IDENTITY() as TaskID
        </cfquery>

        <cfset tempObject = createObject('component','#application.componentPrefix#com.dotComIt.learnWith.vos.TaskFilterVO')/>
        <cfset tempObject['taskID'] = local.dataQuery.TaskID />
        <cfset JSONedObject = SerializeJSON(tempObject) />
        <cfset results = getFilteredTasks(JSONedObject)>
        <cfreturn results />

    </cffunction>

    <cffunction name="updateTask" returnformat="plain" access="remote"
            output="true" >
        <cfargument name="taskID" type="numeric" required="true" />
        <cfargument name="taskCategoryID" type="numeric" required="true"/>
        <cfargument name="description" type="String" required="true" />

        <cfquery datasource="#application.dsn#" name="local.dataQuery"
                result="local.results">
              update tasks
              set
              <cfif taskCategoryID NEQ 0>
                        taskCategoryID = <cfqueryparam value="#arguments.taskCategoryID#"
                                cfsqltype="cf_sql_integer">,
              <cfelse>
                        taskCategoryID = null,
                    </cfif>
                        description = <cfqueryparam value="#arguments.description#" cfsqltype="cf_sql_varchar">
              where taskID = <cfqueryparam value="#arguments.taskID#" cfsqltype="cf_sql_integer">
        </cfquery>

        <cfset tempObject = createObject('component','#application.componentPrefix#com.dotComIt.learnWith.vos.TaskFilterVO')/>
        <cfset tempObject.taskID = arguments.taskID />
        <cfset JSONedObject = SerializeJSON(tempObject) />
        <cfset results = getFilteredTasks(JSONedObject)>
        <cfreturn results />
    </cffunction>

    <cffunction name="scheduleTask" returnformat="plain" access="remote"
            output="true" >
        <cfargument name="taskID" type="numeric" required="true" />
        <cfargument name="dateScheduled" type="date" required="false" />

        <cfquery datasource="#application.dsn#" name="local.dataQuery"
                result="local.results">
            update tasks
            <cfif isDefined('arguments.dateScheduled')>
            set dateScheduled = <cfqueryparam
                    value="#createODBCDateTime(arguments.dateScheduled)#"
                    cfsqltype="cf_sql_timestamp" />
        <cfelse>
            set dateScheduled=<cfqueryparam null="true"
                    cfsqltype="cf_sql_timestamp"/>
        </cfif>
            where taskID = <cfqueryparam value="#arguments.taskID#" cfsqltype="cf_sql_integer" >
        </cfquery>

        <cfset tempObject =  createObject('component','#application.componentPrefix#com.dotComIt.learnWith.vos.TaskFilterVO')/>
        <cfset tempObject.taskID = arguments.taskID />
        <cfset local.JSONedObject = SerializeJSON(tempObject) />
        <cfset local.results = getFilteredTasks(local.JSONedObject)>
        <cfreturn local.results />

    </cffunction>

    <cffunction name="scheduleTaskList" returnformat="plain" access="remote"
            output="true" >
        <cfargument name="taskIDList" type="string" required="true" />
        <cfargument name="dateScheduled" type="date" required="false" />

        <cfset local.taskIDsForSQL = ""/>
        <cfloop list="#arguments.taskIDList#" index="local.tempTaskID" >
            <cfif isNumeric(local.tempTaskID)>
                <cfset local.taskIDsForSQL = ListAppend(local.taskIDsForSQL,local.tempTaskID)/>
            </cfif>
        </cfloop>

        <cfquery datasource="#application.dsn#" name="local.dataQuery"
                result="local.results">
            update tasks
            <cfif isDefined('arguments.dateScheduled')>
                set dateScheduled = <cfqueryparam
                    value="#createODBCDateTime(arguments.dateScheduled)#" cfsqltype="cf_sql_timestamp" />

            <cfelse>
                set dateScheduled = <cfqueryparam null="true" cfsqltype="cf_sql_timestamp" />
            </cfif>
            where taskID in (#local.taskIDsForSQL#)
        </cfquery>

        <cfset local.resultObject = createObject('component','#application.componentPrefix#com.dotComIt.learnWith.vos.ResultObjectVO')/>
        <cfset local.resultObject['error'] = false />
        <cfset local.resultString = convertToJSON(local.resultObject) />
        <cfreturn local.resultString />

    </cffunction>


</cfcomponent>
