package ${PACKAGE_NAME};

import com.intellij.openapi.components.ServiceManager;

#parse("Java File Header.java")
public interface ${NAME} {
    static ${NAME} getInstance() {
        return ServiceManager.getService(${NAME}.class);
    }
}
