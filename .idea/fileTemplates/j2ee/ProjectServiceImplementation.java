#if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end
#if(${INTERFACE_PACKAGE_NAME} && ${INTERFACE_PACKAGE_NAME} != "")
import ${INTERFACE_PACKAGE_NAME}.${INTERFACE_NAME};#end
import com.intellij.openapi.project.Project;

#parse("Java File Header.java")
public class ${NAME} implements ${INTERFACE_NAME} {
    public ${NAME}(Project project) {
    }
}
