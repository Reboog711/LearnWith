<cfset application.debugMode = 1>

<cfset service = createObject('component','#application.componentPrefix#com.dotComIt.learnWith.services.TaskService')>



<h1>Get Not Completed Tasks</h1>
<cfset tempObject = createObject('component','#application.componentPrefix#com.dotComIt.learnWith.vos.TaskFilterVO')/>
<cfset tempObject.completed = 0 />
<cfset resultString = SerializeJSON(tempObject) />
<cfset results = service.getFilteredTasks(resultString)> <Br/>
Results: <Br/>
<cfdump var="#results#" expand="false" />

<h1>Get Tasks After Date</h1>
<cfset tempObject =createObject('component','#application.componentPrefix#com.dotComIt.learnWith.vos.TaskFilterVO')/>
<cfset tempObject.startDate = createDate(2013,3,29) />
<cfset resultString = SerializeJSON(tempObject) />
<cfset results = service.getFilteredTasks(resultString)> <Br/>
Results: <Br/>
<cfdump var="#results#" expand="false" />

<cfset application.debugMode = 0>
