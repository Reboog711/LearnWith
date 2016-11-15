<!---
  Created by jhouser on 5/10/2016.
--->

<cfcomponent displayname="ApplicationCFC" output="true" >
    <cfscript>
        this.name = "learnWith";
        this.applicationTimeout = createTimeSpan(1,1,0,0);
        this.sessionManagement = "false";
    </cfscript>

    <cffunction name="onApplicationStart" returntype="boolean" output="true">
        <cfset application.dsn = "LearnWithApp">
        <cfset application.debugMode = 0>
        <cfset application.componentPrefix = "chapter8.coldFusion.">
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
        <cfmail to="#to#" from="#from#" replyto="#from#"
                subject="Learn With Error #cgi.HTTP_HOST#" type="html">
            Error Date: #now()#<Br/><br/>
        Exception:
            <cfdump var="#arguments.exception#">
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
