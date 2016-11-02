<!---
  Created by jhouser on 5/10/2016.
--->
<cfcomponent displayname="ResultObjectVO"
        hint="I represent the response from a remote service call"
        alias="com.dotcomit.learnWith.vos.ResultObjectVO">
    <cfproperty name="error" type="Boolean" >
    <cfproperty name="resultObject" type="any" >
</cfcomponent>
