#parse("JSP File Header.jsp")
<%@page contentType="text/html"%>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Create ${entityInfo.name}</title>
    </head>
    <body>
        <f:view>
            <h:messages errorStyle="color: red" infoStyle="color: green" layout="table"/>
            <h1>Create ${entityInfo.name}</h1>
            <h:form>
                <h:commandLink action="${entityInfo.listAction}" value="Cancel"/>
            </h:form>
        </f:view>
    </body>
</html>
