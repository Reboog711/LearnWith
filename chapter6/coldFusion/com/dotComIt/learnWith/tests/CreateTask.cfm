<!---
  Created by jhouser on 5/15/2016.
--->

<cfset application.debugMode = 1>

<h1>Create Task</h1>
<cfset service = createObject('component','#application.componentPrefix#com.dotComIt.learnWith.services.TaskService')>
<cfset results = service.createTask(1,1,'created by Test Harness')>
Results: <Br/>
<cfdump var="#results#" expand="false" />

<cfset application.debugMode = 0>
