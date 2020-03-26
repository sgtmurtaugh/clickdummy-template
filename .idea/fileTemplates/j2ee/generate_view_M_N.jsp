#parse("JSP File Header.jsp")
<%@page contentType="text/html"%>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>${entityInfo.name} View</title>
    </head>
    <body>
        <f:view>
            <h:messages errorStyle="color: red" infoStyle="color: green" layout="table"/>
            <h1>${entityInfo.name} View</h1>
            <h:form>
                <h:panelGrid columns="2">
                #foreach($attrInfo in ${entityInfo.attrs})
                    <h:outputText value="${attrInfo.name}:"/>
                    #if (${attrInfo.type} == "MANY_TO_MANY" || ${attrInfo.type} == "ONE_TO_MANY")

                    #set ($targetEntityInfo = ${attrInfo.targetEntityInfo})

                    <h:dataTable value='#{${attrInfo.managedBeanReference}}' var='item' border="1" cellpadding="2" cellspacing="0">

                       #foreach($targetAttrInfo in ${targetEntityInfo.attrs})
                        #if (${targetAttrInfo.type} != "MANY_TO_MANY" && ${targetAttrInfo.type} != "ONE_TO_MANY")
                          <h:column>
                            <f:facet name="header">
                                <h:outputText value="${targetAttrInfo.name}"/>
                            </f:facet>
                            <h:outputText value="#{item.${targetAttrInfo.referenceName}}"/>
                        </h:column>
                        #end
                      #end
                    </h:dataTable>
                    #else
                    <h:outputText value="${attrInfo.managedBeanReference}" title="${attrInfo.attribute.name.stringValue}" />
                    #end
                #end
                </h:panelGrid>

                <h:commandButton action="${entityInfo.editAction}" value="Edit" />
                <br>
                <h:commandButton action="${entityInfo.listAction}" value="Show All"/>
                <br>
            </h:form>
        </f:view>
    </body>
</html>
