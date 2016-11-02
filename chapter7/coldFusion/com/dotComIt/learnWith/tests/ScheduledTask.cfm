<!---
  Created by jhouser on 5/15/2016.
--->

<cfset application.debugMode = 1>

<h1>Schedule Task</h1>
<cfset service =
    createObject('component','#application.componentPrefix#com.dotComIt.learnWith.services.TaskService')>
<cfset results = service.scheduleTask(1,createDate(2013,3,29))>
Results: <Br/>
<cfdump var="#results#" expand="false" />

<h1>Cancel Task</h1>
<cfset service =
    createObject('component','#application.componentPrefix#com.dotComIt.learnWith.services.TaskService')>
<cfset results = service.scheduleTask(1)>
Results: <Br/>
<cfdump var="#results#" expand="false" />


<cfset application.debugMode = 0>
