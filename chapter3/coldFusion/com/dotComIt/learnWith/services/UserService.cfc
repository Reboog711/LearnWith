<cfcomponent
        rest="true"
        restpath="/user"
        displayname="UserService"
        hint="I handle authentication for the LearnWith test app"
        >

    <cffunction name="dump" access="remote" restpath="/dump" returnType="String" httpmethod="POST"
            consumes="application/json" produces="application/json">
        <cfset requestData = getHTTPRequestData()>
        <cfmail to="jeffry@dot-com-it.com" from="jeffry@dot-com-it.com" replyto="jeffry@dot-com-it.com"
                subject="Learn With Debug #cgi.HTTP_HOST#" type="html">
            Date: #now()#<Br/><br/>
            <cfdump var="#requestData#"/>
            <cfdump var="#ToString(requestData.content)#"/>
            <cfdump var="#deserializeJSON(ToString(requestData.content))#"/>
        </cfmail>
        <cfreturn serializeJSON(deserializeJSON(ToString(requestData.content)))>
    </cffunction>


    <cffunction name="authenticate" access="remote" restpath="/login" returntype="void" httpmethod="POST"
            consumes="application/json"
            produces="application/json"
            >
        <cfset requestData = getHTTPRequestData()>
        <cfset userInfo = deserializeJSON(ToString(requestData.content)) />

        <cfquery datasource="#application.dsn#" name="local.dataQuery" >
            select * from users
            where username = <cfqueryparam cfsqltype="cf_sql_varchar" value="#userInfo.username#"> and
            password = <cfqueryparam cfsqltype="cf_sql_varchar" value="#userInfo.password#">
        </cfquery>

        <cfset local.result = structNew()/>

        <cfif local.dataQuery.recordcount EQ 1>
            <cfset local.userVO = createObject('component','#application.componentPrefix#com.dotComIt.learnWith.vos.UserVO')/>
            <cfset local.userVO['userID'] = dataQuery.userID />
            <cfset local.userVO['username'] = dataQuery.username />
            <cfset local.userVO['roleID'] = dataQuery.roleID />

            <cfset local.result.status = 200 />
            <cfset local.result.content = SerializeJSON(local.userVO) />
        <cfelse>
            <cfset local.result.status = 401 />
            <cfset local.error = structNew()/>
            <cfset local.error['message'] = 'User Not Authorized'/>

            <cfset local.result.content = SerializeJSON(local.error) />
        </cfif>

        <cfif application.debugMode is 1>
            <cfmail to="jeffry@dot-com-it.com" from="jeffry@dot-com-it.com" replyto="jeffry@dot-com-it.com"
                    subject="Learn With Debug #cgi.HTTP_HOST#" type="html">
                Date: #now()#<Br/><br/>
                <cfdump var="#userInfo#"/>
                <cfdump var="#local.dataQuery#" /><Br/>
                <cfdump var="#local.result#" /><Br/>
            </cfmail>
        </cfif>

        <cfset restSetResponse(local.result) />
    </cffunction>

    <cffunction name="hashPassword" type="string" required="true"
            hint="I am a helper function for hashing passwords" >
        <cfargument name="password" type="string" required="true"
                hint="I am an unhashed password"/>
        <cfreturn hash(arguments.password) />
    </cffunction>


</cfcomponent>
