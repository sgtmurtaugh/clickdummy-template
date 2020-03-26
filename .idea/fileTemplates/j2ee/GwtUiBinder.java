package ${PACKAGE_NAME};

import com.google.gwt.core.client.GWT;
import com.google.gwt.uibinder.client.UiBinder;
#if(${IS_WIDGET})
import com.google.gwt.user.client.ui.Composite;
#end

#parse("Java File Header.java")
public class ${NAME} #if(${IS_WIDGET})extends Composite #end{
    interface ${NAME}UiBinder extends UiBinder<${ROOT_ELEMENT_TYPE}, ${QUALIFIED_NAME}> {}
    private static ${NAME}UiBinder ourUiBinder = GWT.create(${NAME}UiBinder.class);

    public ${NAME}() {
#if(${IS_WIDGET})
        initWidget(ourUiBinder.createAndBindUi(this));
#else
        ${ROOT_ELEMENT_TYPE} rootElement = ourUiBinder.createAndBindUi(this);
#end
    }
}