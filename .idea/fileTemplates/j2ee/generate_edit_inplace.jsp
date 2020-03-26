#parse("JSP File Header.jsp")
<%@page contentType="text/html"%>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>${entityInfo.name} List</title>
    </head>
    <body>
        <f:view>
<h1>${entityInfo.name} List</h1>
<h:form>
    <h:dataTable value='${entityInfo.allEntitiesMethod}' var='item' border="1" cellpadding="2" cellspacing="0">
       #foreach($attrInfo in ${entityInfo.attrs})
        #if (${attrInfo.type} != "MANY_TO_MANY" && ${attrInfo.type} != "ONE_TO_MANY")
          <h:column>
<f:facet name="header">
    <h:outputText value="${attrInfo.name}"/>
</f:facet>
#if (${attrInfo.type} == "MANY_TO_ONE" || ${attrInfo.type} == "ONE_TO_ONE")
<h:selectOneMenu rendered="#{item == ${entityInfo.managedBeanName}.entity}" value="#{${entityInfo.managedBeanName}.entity.${attrInfo.referenceName}}"  title="${attrInfo.name}">
    <f:selectItems  value="#{${attrInfo.referencedManagedBeanName}.allEntitiesAsSelectedItems}"/>
</h:selectOneMenu>
<h:outputText rendered="#{item != ${entityInfo.managedBeanName}.entity}" value="#{item.${attrInfo.referenceName}}"/>
#else
<h:inputText rendered="#{item == ${entityInfo.managedBeanName}.entity}" value="#{${entityInfo.managedBeanName}.entity.${attrInfo.referenceName}}"/>
<h:outputText rendered="#{item != ${entityInfo.managedBeanName}.entity}" value="#{item.${attrInfo.referenceName}}"/>
#end
        </h:column>
        #end
      #end
    </h:dataTable>
    <h:commandButton action="${entityInfo.saveMethod}" value="Save"/>
    <h:commandButton action="${entityInfo.listAction}" value="Cancel"/>
</h:form>
        </f:view>
    </body>
</html>
