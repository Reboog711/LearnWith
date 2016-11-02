<cfset application.debugMode = 1>
<h1>Test Authentication Success</h1>

<cfset service = createObject('component','#application.componentPrefix#com.dotComIt.learnWith.services.AuthenticationService')>
<cfset passwordHashed = #hash('me')#/>
<cfset results = service.authenticate('me',passwordHashed)>
<Br/><Br/>
Results: <Br/>
<cfdump var="#results#" expand="false" />

<h1>Test Authentication Fail</h1>
<cfset results = service.authenticate('me','me')>
<Br/><Br/>
Results: <Br/>
<cfdump var="#results#" expand="false" />

<cfset application.debugMode = 0>
