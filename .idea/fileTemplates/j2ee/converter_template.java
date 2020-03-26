#if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")
package ${PACKAGE_NAME};
#end
import javax.faces.convert.Converter;
import javax.faces.context.FacesContext;
import javax.faces.component.UIComponent;

${entityInfo.entityImport}

#parse("Java File Header.java")
public class ${CONVERTER_CLASS_NAME} implements Converter {

    public ${CONVERTER_CLASS_NAME}() {
    }

    public Object getAsObject(FacesContext facesContext, UIComponent uIComponent, String string) {
        if (string == null || string.trim().length() == 0) {
            return null;
        }

        ${MANAGED_BEAN_CLASS_NAME} managedBean = (${MANAGED_BEAN_CLASS_NAME}) facesContext.getApplication().getVariableResolver().resolveVariable(
            facesContext, "${entityInfo.managedBeanName}");

        ${entityInfo.pkInitializationCode}

        return managedBean.findEntity(id);
    }

    public String getAsString(FacesContext facesContext, UIComponent uIComponent, Object object) {
        if (object == null) return null;

        if(object instanceof ${entityInfo.name}) {
            ${entityInfo.name} entity = (${entityInfo.name}) object;

            ${entityInfo.pkToStringCode}
            
            return pk;
        } else {
            throw new IllegalArgumentException("Incorrect object type: "+ object.getClass().getName() + "; must be: ${entityInfo.name}");
        }
    }
}
