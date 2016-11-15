<cfcomponent displayname="AuthenticationService" hint="I handle authentication for the LearnWith test app">

    <cffunction name="authenticate" returnformat="plain" access="remote"
            output="true"
            hint="I authenticate the user for the LearnWith test app" >
        <cfargument name="username" type="string" required="true" />
        <cfargument name="password" type="string" required="true" hint="I am the hashed password" />

        <cfquery datasource="#application.dsn#" name="local.dataQuery" >
            select * from users
            where username = <cfqueryparam cfsqltype="cf_sql_varchar" value="#arguments.username#"> and
                  password = <cfqueryparam cfsqltype="cf_sql_varchar" value="#arguments.password#">
        </cfquery>
        <cfif application.debugMode is 1>
            <cfdump var="#local.dataQuery#" /><Br/>
        </cfif>

        <cfset local.resultObject = createObject('component','#application.componentPrefix#com.dotComIt.learnWith.vos.ResultObjectVO')/>

        <cfif local.dataQuery.recordcount EQ 1>
            <cfset local.tempObject = createObject('component','#application.componentPrefix#com.dotComIt.learnWith.vos.UserVO')/>
            <cfset local.tempObject['userID'] = dataQuery.userID />
            <cfset local.tempObject['username'] = dataQuery.username />
            <cfset local.tempObject['role'] = dataQuery.roleID />
            <cfset local.resultObject['error'] = 0 />
            <cfset local.resultObject['resultObject'] = local.tempObject />
        <cfelse>
            <cfset local.resultObject['error'] = 1 />
        </cfif>

        <cfset local.resultString = SerializeJSON(local.resultObject) />
        <cfif isDefined('url.callback')>
            <cfset local.resultString= url.callback & "(" & local.resultString & ");"/>
        </cfif>
        <cfreturn local.resultString>


    </cffunction>

    <cffunction name="hashPassword" type="string" required="true"
            hint="I am a helper function for hashing passwords" >
        <cfargument name="password" type="string" required="true"
                hint="I am an unhashed password"/>
        <cfreturn hash(arguments.password) />
    </cffunction>


</cfcomponent>
