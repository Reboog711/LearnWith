<cfcomponent
        rest="true"
        restpath="/taskcategories"
        displayname="TaskCategories"
        hint="I load Task Categories"
        >

    <cffunction name="getTaskcategories" access="remote" returnType="void" httpmethod="GET"
            produces="application/json"
            hint="I retrieve task Categories">

        <cfquery datasource="#application.dsn#" name="local.dataQuery" >
            select * from taskCategories
            order by taskCategory
        </cfquery>

        <cfset local.result = structNew()/>
        <cfset local.result.status = 200 />
        <cfset local.resultContent = arrayNew(1)/>

        <Cfoutput query="local.dataQuery">
            <cfset local.tempObject = createObject('component', '#application.componentPrefix#com.dotComIt.learnWith.vos.TaskCategoryVO')/>
            <cfset local.tempObject['taskCategoryID'] = dataQuery.taskCategoryID />
            <cfset local.tempObject['taskCategory'] = dataQuery.taskCategory />
            <cfset arrayAppend(local.resultContent,local.tempObject)/>
        </Cfoutput>

        <cfset local.result.content = SerializeJSON(local.resultContent) />
        <cfset restSetResponse(local.result) />

    </cffunction>

</cfcomponent>
