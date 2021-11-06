<cfcomponent displayname="ApplicationCFC" output="true" >
    <cfscript>
        this.name = "learnWithC6";
        this.applicationTimeout = createTimeSpan(1,1,0,0);
        this.sessionManagement = "false";
        this.restsettings.autoregister = true;
        this.restsettings.skipCFCWithError = true;
    </cfscript>

    <cffunction name="onApplicationStart" returntype="boolean" output="true">
        <cfset application.dsn = "LearnWithApp">
        <cfset application.debugMode = 1>
        <cfset application.componentPrefix = "A12.chapter6.coldFusion.">
        <cfset RestInitApplication(expandPath('/A12/chapter6/coldFusion/com/dotComIt/learnWith/services'),"lw6")>

        <cfreturn true>
    </cffunction>

    <cffunction name="onRequestStart" returntype="boolean" output="false">
        <cfargument name="thePage"type="string"required="true">
        <cfif isDefined('url.reinit')>
            <cfset onApplicationStart()>
        </cfif>
        <cfreturn true>
    </cffunction>

    <cffunction name="onError" returnType="void" output="true">
        <cfargument name="exception" required="true">
        <cfargument name="eventname" type="string" required="true">
        <cfset var to="myEmail@mydomain.com">
        <cfset var from="myEmail@mydomain.com">
        <cfset var to="jeffry@dot-com-it.com">
        <cfset var from="jeffry@dot-com-it.com">
        <cfmail to="#to#" from="#from#" replyto="#from#"
                subject="Learn With Error #cgi.HTTP_HOST#" type="html">
            Error Date: #now()#<Br/><br/>
        Exception:
            <cfdump var="#arguments.exception#">
            Exception Drill Down:
            EventName:
            <cfdump var="#arguments.eventname#">
            CGI:
            <cfdump var="#cgi#">
            Request
            <Cfdump var="#request#">
        </cfmail>

        <cfif application.debugMode is 1>
            Error Date: #now()#<Br/><br/>
            Exception:
            <cfdump var="#arguments.exception#">
            EventName:
            <cfdump var="#arguments.eventname#">
            CGI:
            <cfdump var="#cgi#">
            Request
            <Cfdump var="#request#">
        </cfif>

    </cffunction>

</cfcomponent>
