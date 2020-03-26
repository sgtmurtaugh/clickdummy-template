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
              <h:commandButton action="${entityInfo.startCreateMethod}" value="Create"/>

              <h:dataTable value='${entityInfo.allEntitiesMethod}' var='item' border="1" cellpadding="2" cellspacing="0">
                 #foreach($attrInfo in ${entityInfo.attrs})
                  #if (${attrInfo.type} != "MANY_TO_MANY" && ${attrInfo.type} != "ONE_TO_MANY")
                    <h:column>
                      <f:facet name="header">
                      <h:outputText value="${attrInfo.name}"/>
                      </f:facet>
                      <h:outputText value="#{item.${attrInfo.referenceName}}"/>
                  </h:column>
                  #end
                #end
                 <h:column>
                      <h:commandButton value="View" action="${entityInfo.startViewMethod}">
                          <f:param name="id" value="#{item.${entityInfo.pkAttribute}}"/>
                      </h:commandButton>&nbsp;
                      <h:commandButton value="Edit" action="${entityInfo.startEditMethod}">
                          <f:param name="id" value="#{item.${entityInfo.pkAttribute}}"/>
                      </h:commandButton>&nbsp;
                      <h:commandButton value="Delete" action="${entityInfo.deleteMethod}">
                          <f:param name="id" value="#{item.${entityInfo.pkAttribute}}"/>
                      </h:commandButton>
                  </h:column>
              </h:dataTable>
            </h:form>
        </f:view>
    </body>
</html>
