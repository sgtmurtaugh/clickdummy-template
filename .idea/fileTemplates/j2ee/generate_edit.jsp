#parse("JSP File Header.jsp")
<%@page contentType="text/html"%>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Edit ${entityInfo.name}</title>
    </head>
    <body>
        <f:view>
            <h:messages errorStyle="color: red" infoStyle="color: green" layout="table"/>
            <h1>Edit ${entityInfo.name}</h1>
            <h:form>
                <h:panelGrid columns="2">
                #foreach($attrInfo in ${entityInfo.attrs})
                    <h:outputText value="${attrInfo.name}:"/>
                    #if (${attrInfo.type} == "MANY_TO_MANY" || ${attrInfo.type} == "ONE_TO_MANY")

                    #else
                        #if (${attrInfo.type} == "MANY_TO_ONE" || ${attrInfo.type} == "ONE_TO_ONE")
                            <h:selectOneMenu value="${attrInfo.managedBeanReference}"  title="${attrInfo.name}">
                                <f:selectItems  value="#{${attrInfo.referencedManagedBeanName}.allEntitiesAsSelectedItems}"/>
                            </h:selectOneMenu>
                        #else
                            <h:inputText value="${attrInfo.managedBeanReference}" title="${attrInfo.name}" />
                        #end
                    #end
                #end
                </h:panelGrid>

                <h:commandButton action="${entityInfo.saveMethod}" value="Save"/>
                <h:commandButton action="${entityInfo.listAction}" value="Cancel"/>
                <br>
            </h:form>
        </f:view>
    </body>
</html>
