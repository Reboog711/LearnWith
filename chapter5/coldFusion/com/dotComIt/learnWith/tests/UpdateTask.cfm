<!---
  Created by jhouser on 5/15/2016.
--->

<cfset application.debugMode = 1>

<h1>Update Task</h1>
<cfset service =
    createObject('component','#application.componentPrefix#com.dotComIt.learnWith.services.TaskService')>
<cfset results = service.updateTask(1,2,'Get Milk')>
Results: <Br/>
<cfdump var="#results#" expand="false" />

<cfset application.debugMode = 0>
