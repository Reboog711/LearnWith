<cfcomponent
        rest="true"
        restpath="/task"
        displayname="TaskService"
        hint="I get, create, or update, a single task"
        >

    <cffunction name="loadTask" access="remote" restpath="{taskID}" returnType="void" httpmethod="GET"
            produces="application/json"
            hint="I retrieve a single task from the db.">
        <cfargument name="taskID" type="string" required="true" restArgSource="path" />

        <cfquery datasource="#application.dsn#" name="local.dataQuery" >
            select *
            from tasks join taskCategories on (tasks.taskCategoryID = taskCategories.taskCategoryID)
            where taskID = <cfqueryparam cfsqltype="cf_sql_numeric" value="#arguments.taskID#">
        </cfquery>

        <cfset local.result = structNew()/>

        <cfif local.dataQuery.recordcount EQ 1>
            <cfset local.taskVO = createObject('component','#application.componentPrefix#com.dotComIt.learnWith.vos.TaskVO')/>
            <cfset local.taskVO['taskID'] = dataQuery.taskID />
            <cfif dataQuery.taskCategoryID NEQ "">
                <cfset local.tempObject['taskCategoryID'] = dataQuery.taskCategoryID />
            </cfif>
            <cfset local.taskVO['taskCategory'] = dataQuery.taskcategory />
            <cfset local.taskVO['userID'] = dataQuery.userID />
            <cfset local.taskVO['description'] = dataQuery.description />
            <cfset local.taskVO['completed'] = dataQuery.completed />
            <cfset local.taskVO['dateCreatedAsUTCString'] = dateFormat(dataQuery.dateCreated, "yyyy-MM-dd" ) & "T" & timeFormat(dataQuery.dateCreated, 'HH:nn:ss.l') & "Z" />
            <cfif dataQuery.dateCompleted NEQ ''>
                <cfset local.taskVO['dateCompletedAsUTCString'] = dateFormat(dataQuery.dateCompleted, "yyyy-MM-dd" ) & "T" & timeFormat(dataQuery.dateCompleted, 'HH:nn:ss.l') & "Z" />
            <cfelse>
                <cfset local.taskVO['dateCompletedAsUTCString'] = "" />
            </cfif>
            <cfif dataQuery.dateScheduled NEQ ''>
                <cfset local.taskVO['dateScheduledAsUTCString'] = dateFormat(dataQuery.dateScheduled, "yyyy-MM-dd" ) & "T" & timeFormat(dataQuery.dateScheduled, 'HH:nn:ss.l') & "Z" />
            <cfelse>
                <cfset local.taskVO['dateScheduledAsUTCString'] = "" />
            </cfif>
            <cfset local.result.status = 200 />
            <cfset local.result.content = SerializeJSON(local.taskVO) />
        <cfelse>
            <cfset local.result.status = 404 />
            <cfset local.error = structNew()/>
            <cfset local.error['message'] = 'Task Not Found'/>
            <cfset local.result.content = SerializeJSON(local.error) />
        </cfif>
        <cfmail to="jeffry@dot-com-it.com" from="jeffry@dot-com-it.com" replyto="jeffry@dot-com-it.com"
                subject="Learn With loadTask Debug #cgi.HTTP_HOST#" type="html">
            Date: #now()#<Br/><br/>
            <Cfdump var="#url#" label="url" />
            <Cfdump var="#arguments#"  label="arguments"/>
            <cfdump var="#local.dataQuery#"/>
            <cfdump var="#local.result#"/>
        </cfmail>

        <cfset restSetResponse(local.result) />
    </cffunction>

    <cffunction name="createTask" access="remote" returnType="void" httpmethod="POST"
            consumes="application/json"
            produces="application/json">
        <cfset requestData = getHTTPRequestData()>
        <cfset taskInfo = deserializeJSON(ToString(requestData.content)) />

        <cfquery datasource="#application.dsn#" name="local.dataQuery" >
            insert into tasks(
            taskCategoryID, userID, description, completed, dateCreated
            ) values(
            <cfif taskInfo.taskCategoryID NEQ 0>
                <cfqueryparam value="#taskInfo.taskCategoryID#" cfsqltype="cf_sql_integer" >,
            <cfelse>
                <cfqueryparam null="true" cfsqltype="cf_sql_integer" >,
            </cfif>
            <cfqueryparam value="#taskInfo.userID#" cfsqltype="cf_sql_integer" >,
            <cfqueryparam value="#taskInfo.description#" cfsqltype="cf_sql_varchar" >,
            <cfqueryparam value="0" cfsqltype="cf_sql_bit" >,
            <cfqueryparam value="#createODBCDateTime(dateConvert("Local2UTC", now()))#" cfsqltype="cf_sql_timestamp" >
            )
            SELECT SCOPE_IDENTITY() as TaskID
        </cfquery>

        <cfset loadTask(local.dataQuery.taskID)>

    </cffunction>

    <cffunction name="updateTask" access="remote" restpath="{taskID}" returnType="void" httpmethod="PUT"
            consumes="application/json"
            produces="application/json">
        <cfargument name="taskID" type="string" required="true" restArgSource="path" />
        <cfset requestData = getHTTPRequestData()>
        <cfset taskInfo = deserializeJSON(ToString(requestData.content)) />

        <cfquery datasource="#application.dsn#" name="local.dataQuery" >
            update tasks
            set
            <cfif taskInfo.taskCategoryID NEQ 0>
                taskCategoryID = <cfqueryparam value="#taskInfo.taskCategoryID#"
                    cfsqltype="cf_sql_integer">,
            <cfelse>
                taskCategoryID = null,
            </cfif>
            description = <cfqueryparam value="#taskInfo.description#" cfsqltype="cf_sql_varchar">
            where taskID = <cfqueryparam value="#arguments.taskID#" cfsqltype="cf_sql_integer">
        </cfquery>

        <cfset loadTask(arguments.taskID)>

    </cffunction>

    <cffunction name="completeTask" access="remote" restpath="{taskID}/completed/{completed}" returnType="void" httpmethod="PUT"
            produces="application/json">
<!---        consumes="application/json"--->
        <cfargument name="taskID" type="string" required="true" restArgSource="path" />
        <cfargument name="completed" type="string" required="true" restArgSource="path" />


        <cfquery datasource="#application.dsn#" name="local.dataQuery" result="local.results">
            update tasks
            <cfif arguments.completed is "false">
                set completed = <cfqueryparam cfsqlType="cf_sql_bit" value="0">,
            <cfelse>
                set completed = <cfqueryparam cfsqlType="cf_sql_bit" value="1">,
            </cfif>

            <cfif arguments.completed is "false">
                dateCompleted = <cfqueryparam null="true" cfsqltype="cf_sql_timestamp" >
            <cfelse>
                dateCompleted = <cfqueryparam value="#createODBCDateTime(dateConvert("Local2UTC", now()))#" cfsqltype="cf_sql_timestamp" >
            </cfif>
            where taskID = <cfqueryparam value="#arguments.taskID#" cfsqltype="cf_sql_integer" >
        </cfquery>

        <cfmail to="jeffry@dot-com-it.com" from="jeffry@dot-com-it.com" replyto="jeffry@dot-com-it.com"
                subject="Learn With Debug Complete Tasks #cgi.HTTP_HOST#" type="html">
            Date: #now()#<Br/><br/>
            <Cfdump var="#url#" label="url" />
            <cfdump var="#arguments#" label="arguments"/>
        </cfmail>
        <cfset loadTask(arguments.taskID)>

    </cffunction>


</cfcomponent>
