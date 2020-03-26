#parse("JSP File Header.jsp")
<%@page contentType="text/html"%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <title>UserEntity List</title>
</head>
<body>
<f:view>
    <h1>${entityInfo.name} List</h1>
    <h:form>
     <table>
     <tr>

     <td valign="top">
         <td valign="top">
            <h:outputText rendered="#{empty ${entityInfo.managedBeanName}.entities}" value="Empty List"/>
            <h:selectOneListbox value="#{${entityInfo.managedBeanName}.entity}" rendered="#{not empty ${entityInfo.managedBeanName}.entities}" size="7">
                <f:selectItems value="#{${entityInfo.managedBeanName}.allEntitiesAsSelectedItems}"/>
            </h:selectOneListbox>
         </td>
         <td valign="top">
            <h:commandButton action="${entityInfo.startCreateMethod}" value="Create"/><br>
            <h:commandButton value="View" action="${entityInfo.startViewMethod}" disabled="#{empty ${entityInfo.managedBeanName}.entities}" /><br>
            <h:commandButton value="Edit" action="${entityInfo.startEditMethod}" disabled="#{empty ${entityInfo.managedBeanName}.entities}" /><br>
            <h:commandButton value="Delete" action="${entityInfo.deleteMethod}" disabled="#{empty ${entityInfo.managedBeanName}.entities}"/>
         </td>
     </tr>
     </table>
    </h:form>
</f:view>
</body>
</html>
