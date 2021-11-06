<cfcomponent
        rest="true"
        restpath="/tasks"
        displayname="TasksService"
        hint="I load task duties"
        >

    <cffunction name="getFilteredTasks" access="remote" returnType="void" httpmethod="GET"
            produces="application/json"
            hint="I retrieve tasks from the db that meet the criteria.">
        <cfargument name="completed" type="boolean" required="false" restArgSource="query" />
        <cfargument name="startDateAsUTCString" type="string" required="false" restArgSource="query" />
        <cfargument name="endDateAsUTCString" type="string" required="false" restArgSource="query" />
        <cfargument name="scheduledStartDateAsUTCString" type="string" required="false" restArgSource="query" />
        <cfargument name="scheduledEndDateAsUTCString" type="string" required="false" restArgSource="query" />
        <cfargument name="taskCategoryID" type="string" required="false" restArgSource="query" />

        <cfset setWhere = 'true' />
        <cfset firstOne = 'true' />

        <cfquery datasource="#application.dsn#" name="local.dataQuery" >
            select *
            from tasks left outer join taskCategories on (tasks.taskCategoryID = taskCategories.taskCategoryID)

            <cfif isDefined('arguments.completed')>
                <cfif setWhere is true >where <cfset setWhere = 'false'></cfif>
                <cfif firstOne is true><cfset firstOne = false><cfelse>and</cfif>
                <cfif arguments.completed is 0>
                    completed = <cfqueryparam cfsqlType="cf_sql_bit" value="0">
                <cfelse>
                    completed = <cfqueryparam cfsqlType="cf_sql_bit" value="1">
                </cfif>
            </cfif>

            <cfif isDefined('arguments.taskCategoryID') and arguments.taskCategoryID NEQ 0>
                <cfif setWhere is true >where <cfset setWhere = 'false'></cfif>
                <cfif firstOne is true><cfset firstOne = false><cfelse>and</cfif>
                taskCategories.taskCategoryID = <cfqueryparam cfsqltype="cf_sql_integer" value="#arguments.taskCategoryID#">
            </cfif>

            <cfif isDefined('arguments.startDateAsUTCString')>
                <cfif setWhere is true >where <cfset setWhere = 'false'></cfif>
                <cfif firstOne is true><cfset firstOne = false><cfelse>and</cfif>
                dateCreated >= <cfqueryparam cfsqltype="cf_sql_date"
                    value="#arguments.startDateAsUTCString#">
            </cfif>

            <cfif isDefined('arguments.endDateAsUTCString')>
                <cfif setWhere is true >where <cfset setWhere = 'false'></cfif>
                <cfif firstOne is true><cfset firstOne = false><cfelse>and</cfif>
                dateCreated <= <cfqueryparam cfsqlType="cf_sql_date" value="#arguments.endDateAsUTCString#">
            </cfif>


            <cfif isDefined('arguments.scheduledStartDateAsUTCString')>
                <cfif setWhere is true >where <cfset setWhere = 'false'></cfif>
                <cfif firstOne is true><cfset firstOne = false><cfelse>and</cfif>
                dateScheduled >= <cfqueryparam cfsqltype="cf_sql_date" value="#arguments.scheduledStartDateAsUTCString#">
            </cfif>
            <cfif isDefined('arguments.scheduledEndDateAsUTCString')>
                <cfif setWhere is true >where <cfset setWhere = 'false'></cfif>
                <cfif firstOne is true><cfset firstOne = false><cfelse>and</cfif>
                dateScheduled <= <cfqueryparam cfsqlType="cf_sql_date" value="#arguments.scheduledEndDateAsUTCString#">
            </cfif>
            order by dateCreated
        </cfquery>

        <cfset local.result = structNew()/>
        <cfset local.result.status = 200 />
        <cfset local.resultContent = arrayNew(1)/>
        <cfoutput query="local.dataQuery">
            <cfset local.tempObject = createObject('component','#application.componentPrefix#com.dotComIt.learnWith.vos.TaskVO')/>
            <cfset local.tempObject['taskID'] = dataQuery.taskID />
            <cfif dataQuery.taskCategoryID NEQ "">
                <cfset local.tempObject['taskCategoryID'] = dataQuery.taskCategoryID />
            </cfif>
            <cfset local.tempObject['taskCategory'] = dataQuery.taskcategory />
            <cfset local.tempObject['userID'] = dataQuery.userID />
            <cfset local.tempObject['description'] = dataQuery.description />
            <cfset local.tempObject['completed'] = dataQuery.completed />
<!--- UTC Date Format:
2017-03-27T00:00:00.000Z
--->
            <cfset local.tempObject['dateCreatedAsUTCString'] = dateFormat(dataQuery.dateCreated, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'" ) />
            <cfset local.tempObject['dateCompletedAsUTCString'] = dateFormat(dataQuery.dateCompleted, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'" ) />
            <cfset local.tempObject['dateScheduledAsUTCString'] = dateFormat(dataQuery.dateScheduled, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'" ) />
            <cfset arrayAppend(local.resultContent,local.tempObject)/>
        </Cfoutput>

        <cfmail to="jeffry@dot-com-it.com" from="jeffry@dot-com-it.com" replyto="jeffry@dot-com-it.com"
                subject="Learn With Debug #cgi.HTTP_HOST#" type="html">
            Date: #now()#<Br/><br/>
            <Cfdump var="#url#" label="url" />
            <Cfdump var="#arguments#"  label="arguments"/>
            <cfdump var="#local.dataQuery#"/>
            <cfdump var="#local.resultContent#"/>
            <cfdump var="#local.result#"/>
        </cfmail>

        <cfset local.result.content = SerializeJSON(local.resultContent) />

        <cfset restSetResponse(local.result) />

    </cffunction>


<!---
    <cffunction name="getFilteredTasks" access="remote" returnType="void" httpmethod="GET"
            produces="application/json"
            hint="I retrieve tasks from the db that meet the criteria.">
        <cfargument name="completed" type="boolean" required="false" restArgSource="query" />
        <cfargument name="taskCategoryID" type="number" required="false" restArgSource="query" />
        <cfargument name="startDateAsUTCString" type="string" required="false" restArgSource="query" />
        <cfargument name="endDateAsUTCString" type="string" required="false" restArgSource="query" />
        <cfargument name="scheduledStartDateAsUTCString" type="string" required="false" restArgSource="query" />
        <cfargument name="scheduledEndDateAsUTCString" type="string" required="false" restArgSource="query" />

        <cfset setWhere = 'true' />
        <cfset firstOne = 'true' />

        <cfquery datasource="#application.dsn#" name="local.dataQuery" >
            select *
            from tasks join taskCategories on (tasks.taskCategoryID = taskCategories.taskCategoryID)

            <cfif isDefined('arguments.completed')>
                <cfif setWhere is true >where <cfset setWhere = 'false'></cfif>
                <cfif firstOne is true><cfset firstOne = false><cfelse>and</cfif>
                <cfif arguments.completed is 0>
                    completed = <cfqueryparam cfsqlType="cf_sql_bit" value="0">
                <cfelse>
                    completed = <cfqueryparam cfsqlType="cf_sql_bit" value="1">
                </cfif>
            </cfif>

            <cfif isDefined('arguments.taskCategoryID') and arguments.taskCategoryID NEQ 0>
                <cfif setWhere is true >where <cfset setWhere = 'false'></cfif>
                <cfif firstOne is true><cfset firstOne = false><cfelse>and</cfif>
                taskCategories.taskCategoryID = <cfqueryparam cfsqltype="cf_sql_integer" value="#arguments.taskCategoryID#">
            </cfif>


<!---
            <cfif isDefined('arguments.startDateAsUTCString')>
                <cfif setWhere is true >where <cfset setWhere = 'false'></cfif>
                <cfif firstOne is true><cfset firstOne = false><cfelse>and</cfif>
                dateCreated >= <cfqueryparam cfsqltype="cf_sql_date" value="#arguments.startDateAsUTCString#">
            </cfif>

            <cfif isDefined('arguments.endDateAsUTCString')>
                <cfif setWhere is true >where <cfset setWhere = 'false'></cfif>
                <cfif firstOne is true><cfset firstOne = false><cfelse>and</cfif>
                dateCreated <= <cfqueryparam cfsqlType="cf_sql_date" value="#arguments.endDateAsUTCString#">
            </cfif>

            <cfif isDefined('arguments.scheduledStartDateAsUTCString')>
                <cfif setWhere is true >where <cfset setWhere = 'false'></cfif>
                <cfif firstOne is true><cfset firstOne = false><cfelse>and</cfif>
                dateScheduled >= <cfqueryparam cfsqltype="cf_sql_date" value="#arguments.scheduledStartDateAsUTCString#">
            </cfif>
            <cfif isDefined('arguments.scheduledEndDateAsUTCString')>
                <cfif setWhere is true >where <cfset setWhere = 'false'></cfif>
                <cfif firstOne is true><cfset firstOne = false><cfelse>and</cfif>
                dateScheduled <= <cfqueryparam cfsqlType="cf_sql_date" value="#arguments.scheduledEndDateAsUTCString#">
            </cfif>
--->
            order by dateCreated
        </cfquery>

        <cfset local.result = structNew()/>
        <cfset local.result.status = 200 />
        <cfset local.resultContent = arrayNew(1)/>
        <cfoutput query="local.dataQuery">
            <cfset local.tempObject = createObject('component','#application.componentPrefix#com.dotComIt.learnWith.vos.TaskVO')/>
            <cfset local.tempObject['taskID'] = dataQuery.taskID />
            <cfset local.tempObject['taskCategoryID'] = dataQuery.taskCategoryID />
            <cfset local.tempObject['taskCategory'] = dataQuery.taskcategory />
            <cfset local.tempObject['userID'] = dataQuery.userID />
            <cfset local.tempObject['description'] = dataQuery.description />
            <cfset local.tempObject['completed'] = dataQuery.completed />
            <!--- UTC Date Format:
            2017-03-27T00:00:00.000Z
            --->
            <cfset local.tempObject['dateCreatedAsUTCString'] = dateFormat(dataQuery.dateCreated, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'" ) />
            <cfset local.tempObject['dateCompletedAsUTCString'] = dateFormat(dataQuery.dateCompleted, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'" ) />
            <cfset local.tempObject['dateScheduledAsUTCString'] = dateFormat(dataQuery.dateScheduled, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'" ) />
            <cfset arrayAppend(local.resultContent,local.tempObject)/>
        </Cfoutput>

        <cfmail to="jeffry@dot-com-it.com" from="jeffry@dot-com-it.com" replyto="jeffry@dot-com-it.com"
                subject="Learn With Debug #cgi.HTTP_HOST#" type="html">
            Date: #now()#<Br/><br/>
            <Cfdump var="#url#" label="url" />
            <Cfdump var="#arguments#"  label="arguments"/>
            <cfdump var="#local.dataQuery#"/>
            <cfdump var="#local.resultContent#"/>
            <cfdump var="#local.result#"/>
        </cfmail>

        <cfset local.result.content = SerializeJSON(local.resultContent) />

        <cfset restSetResponse(local.result) />

    </cffunction>
--->

    <cffunction name="dump" access="remote" restpath="/dump" returnType="void" httpmethod="GET"
            produces="application/json">
        <cfargument name="test" type="String" required="false" hint="Test Value" restArgSource="query" />
        <cfset requestData = getHTTPRequestData()>
        <cfset local.result = structNew()/>
        <cfset local.result.status = 200 />
        <cfset local.resultContent = structNew()/>
        <cfset local.resultContent['arg'] = arguments.test/>
        <cfset local.result.content = SerializeJSON(local.resultContent) />
        <cfmail to="jeffry@dot-com-it.com" from="jeffry@dot-com-it.com" replyto="jeffry@dot-com-it.com"
                subject="Learn With Tasks Debug #cgi.HTTP_HOST#" type="html">
            Date: #now()#<Br/><br/>
            <cfdump var="#requestData#"/>
            <cfdump var="#url#" label="URL Scope Dump" />
            <cfdump var="#arguments#" label="Test Argument" />
            <cfdump var="#arguments['test']#" label="Test Argument" />
            <cfdump var="#arguments['TEST']#" label="Test Argument" />
            <cfdump var="#local.result#" label="LocalResult" />
        </cfmail>
        <cfset restSetResponse(local.result) />

    </cffunction>

</cfcomponent>
