package ${PACKAGE_NAME};

import com.google.gwt.event.shared.GwtEvent;

#parse("Java File Header.java")
public class ${NAME} extends GwtEvent<${HANDLER_NAME}> {
    public static Type<${HANDLER_NAME}> TYPE = new Type<${HANDLER_NAME}>();

    public Type<${HANDLER_NAME}> getAssociatedType() {
        return TYPE;
    }

    protected void dispatch(${HANDLER_NAME} handler) {
        handler.${METHOD_NAME}(this);
    }
}
