<!---
  Created by jhouser on 5/10/2016.
--->

<h1>Test Hash Password Me</h1>
<cfset service = createObject('component', '#application.componentPrefix#com.dotComIt.learnWith.services.AuthenticationService')>
<cfset results = service.hashPassword('me')>
<cfdump var="#results#" expand="false" />
<h1>Test Hash Password Wife</h1>
<cfset results = service.hashPassword('wife')>
<cfdump var="#results#" expand="false" />

