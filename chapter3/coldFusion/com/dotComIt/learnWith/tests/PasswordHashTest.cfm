<h1>Test Hash Password Me</h1>
<cfset service = createObject('component', '#application.componentPrefix#com.dotComIt.learnWith.services.UserService')>
<cfset results = service.hashPassword('me')>
<cfdump var="#results#" expand="false" />
<h1>Test Hash Password Wife</h1>
<cfset results = service.hashPassword('you')>
<cfdump var="#results#" expand="false" />

