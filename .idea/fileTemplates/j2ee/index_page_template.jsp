#parse("JSP File Header.jsp")
<%@page contentType="text/html"%>
<html>
<head><title>Generated Entities</title></head>
<body>

<h1>Generated Entities</h1>
<br/>
<f:view>
    <h:form>
        #foreach($entityInfo in ${Entities})
        <h:commandLink action="${entityInfo.listAction}" value="${entityInfo.name}"/>
        <br/>
        #end
    </h:form>
</f:view>

</body>
</html>
