<!---
  Created by jhouser on 5/15/2016.
--->

<cfset application.debugMode = 1>

<h1>Complete Task</h1>
<cfset service = createObject('component','#application.componentPrefix#com.dotComIt.learnWith.services.TaskService')>

<cfset results = service.completeTask(1,1)>

Results: <Br/>
<cfdump var="#results#" expand="false" />

<h1>Not Complete Task</h1>

<cfset results = service.completeTask(1,0)>
Results: <Br/>
<cfdump var="#results#" expand="false" />


<cfset application.debugMode = 0>
