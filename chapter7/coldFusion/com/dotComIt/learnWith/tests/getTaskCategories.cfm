<!---
  Created by jhouser on 5/14/2016.
--->

<cfset application.debugMode = 1>

<cfset service = createObject('component','#application.componentPrefix#com.dotComIt.learnWith.services.TaskService')>

<cfset results = service.getTaskCategories()>

Results: <Br/>
<cfdump var="#results#" expand="false" />

<cfset application.debugMode = 0>
